// src/ontology/ontology.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEMO_ONTOLOGY } from './ontology.data';
import { CreateTopicDto } from './dto/create-topic.dto';
import axios from 'axios';

@Injectable()
export class OntologyService {
  private readonly logger = new Logger(OntologyService.name);
  private readonly hypertextApiUrl: string;

  constructor(private readonly prisma: PrismaService) {
    this.hypertextApiUrl = process.env.HYPERTEXT_API_URL || 'http://localhost:3002';
  }

  // Static demo data (existing functionality)
  getOntology() {
    return DEMO_ONTOLOGY;
  }

  findNodeByWord(word: string) {
    let bestMatch: any = null;

    function dfs(node: any) {
      if (node.target === word || node.word === word) {
        if (!bestMatch || (node.relations && node.relations.length > 0)) {
          bestMatch = node;
        }
      }
      if (node.relations) {
        for (const child of node.relations) dfs(child);
      }
    }

    dfs(DEMO_ONTOLOGY);
    if (!bestMatch) {
      for (const rel of DEMO_ONTOLOGY.relations) dfs(rel);
    }

    return bestMatch;
  }

  // ========== DB-backed methods ==========

  /**
   * Create or update a topic, increment frequency, link to user,
   * AND call hypertext_backend to process with LLM
   */
  async createOrUpdateTopic(dto: CreateTopicDto) {
    // 1. Upsert the topic
    const topic = await this.prisma.ontologyTopic.upsert({
      where: { name: dto.name },
      create: {
        name: dto.name,
        description: dto.description,
        frequency: 1,
      },
      update: {
        frequency: { increment: 1 },
        ...(dto.description && { description: dto.description }),
      },
    });

    // 2. Link user to topic
    await this.prisma.userOntologyTopic.upsert({
      where: {
        userId_topicId: {
          userId: dto.userId,
          topicId: topic.id,
        },
      },
      create: {
        userId: dto.userId,
        topicId: topic.id,
      },
      update: {},
    });

    // 3. Call hypertext_backend (async, don't block)
    this.callHypertextBackend(dto).catch((err) => {
      this.logger.warn(`Failed to call hypertext backend: ${err.message}`);
    });

    // 4. Return topic with details
    return this.prisma.ontologyTopic.findUnique({
      where: { id: topic.id },
      include: {
        users: {
          include: { user: { select: { id: true, username: true } } },
        },
        outgoingRelations: true,
      },
    });
  }

  /**
   * Call hypertext_backend POST /hypertext/topic
   */
  private async callHypertextBackend(dto: CreateTopicDto) {
    try {
      const response = await axios.post(
        `${this.hypertextApiUrl}/hypertext/topic`,
        {
          userId: dto.userId,
          name: dto.name,
          description: dto.description,
        },
        { timeout: 120000 }
      );

      this.logger.log(`Hypertext backend processed topic "${dto.name}"`);

      // Save related topics to our DB
      if (response.data?.relatedTopics?.length > 0) {
        await this.saveRelatedTopics(dto.name, response.data.relatedTopics);
      }

      return response.data;
    } catch (error) {
      this.logger.error(`Hypertext backend error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Save LLM-extracted related topics as relations
   */
  private async saveRelatedTopics(topicName: string, relatedTopics: string[]) {
    const mainTopic = await this.prisma.ontologyTopic.findUnique({
      where: { name: topicName },
    });

    if (!mainTopic) return;

    for (const relatedName of relatedTopics) {
      const relatedTopic = await this.prisma.ontologyTopic.upsert({
        where: { name: relatedName },
        create: { name: relatedName, frequency: 0 },
        update: {},
      });

      await this.prisma.ontologyTopicRelation.upsert({
        where: {
          fromTopicId_toTopicId: {
            fromTopicId: mainTopic.id,
            toTopicId: relatedTopic.id,
          },
        },
        create: {
          fromTopicId: mainTopic.id,
          toTopicId: relatedTopic.id,
          weight: 1.0,
        },
        update: {
          weight: { increment: 0.1 },
        },
      });
    }

    // Update relatedTopics array
    await this.prisma.ontologyTopic.update({
      where: { id: mainTopic.id },
      data: { relatedTopics },
    });

    this.logger.log(`Saved ${relatedTopics.length} related topics for "${topicName}"`);
  }

  /**
   * Handle hypertext click - forward to hypertext_backend
   */
  async handleHypertextClick(userId: number, clickedWord: string, parentTopicId?: string) {
    try {
      const response = await axios.post(
        `${this.hypertextApiUrl}/hypertext/click`,
        { userId, clickedWord, parentTopicId },
        { timeout: 120000 }
      );

      if (response.data) {
        const { name, description, relatedTopics } = response.data;
        const returnedParentId = response.data.parentTopicId;

        // Create or update topic
        const existingTopic = await this.prisma.ontologyTopic.findUnique({
          where: { name },
        });

        let topic;
        if (existingTopic) {
          topic = await this.prisma.ontologyTopic.update({
            where: { name },
            data: {
              frequency: { increment: 1 },
              ...(description && { description }),
              ...(relatedTopics?.length > 0 && { relatedTopics }),
            },
          });
        } else {
          topic = await this.prisma.ontologyTopic.create({
            data: {
              name,
              description,
              relatedTopics: relatedTopics || [],
              frequency: 1,
            },
          });
        }

        // Link user
        await this.prisma.userOntologyTopic.upsert({
          where: {
            userId_topicId: { userId, topicId: topic.id },
          },
          create: { userId, topicId: topic.id },
          update: {},
        });

        // Create relation to parent
        if (parentTopicId) {
          await this.prisma.ontologyTopicRelation.upsert({
            where: {
              fromTopicId_toTopicId: {
                fromTopicId: parentTopicId,
                toTopicId: topic.id,
              },
            },
            create: {
              fromTopicId: parentTopicId,
              toTopicId: topic.id,
              weight: 1.0,
            },
            update: {
              weight: { increment: 0.5 },
            },
          });
        }

        // Save related topics
        if (relatedTopics?.length > 0) {
          await this.saveRelatedTopics(name, relatedTopics);
        }
      }

      return response.data;
    } catch (error) {
      this.logger.error(`Hypertext click error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all topics as graph
   */
  async getTopicsFromDb() {
    const topics = await this.prisma.ontologyTopic.findMany({
      include: { outgoingRelations: true },
      orderBy: { frequency: 'desc' },
    });

    const nodes = topics.map((topic) => ({
      id: topic.id,
      target: topic.name,
      weight: topic.frequency,
      description: topic.description,
      relatedTopics: topic.relatedTopics,
    }));

    const links = topics.flatMap((topic) =>
      topic.outgoingRelations.map((rel) => ({
        source: rel.fromTopicId,
        target: rel.toTopicId,
        weight: rel.weight ?? 1,
      })),
    );

    return { nodes, links };
  }

  /**
   * Get topics for user
   */
  async getTopicsByUser(userId: number) {
    const topics = await this.prisma.ontologyTopic.findMany({
      where: { users: { some: { userId } } },
      include: { outgoingRelations: true },
      orderBy: { frequency: 'desc' },
    });

    const topicIds = new Set(topics.map((t) => t.id));

    const nodes = topics.map((topic) => ({
      id: topic.id,
      target: topic.name,
      weight: topic.frequency,
      description: topic.description,
      relatedTopics: topic.relatedTopics,
    }));

    const links = topics.flatMap((topic) =>
      topic.outgoingRelations
        .filter((rel) => topicIds.has(rel.toTopicId))
        .map((rel) => ({
          source: rel.fromTopicId,
          target: rel.toTopicId,
          weight: rel.weight ?? 1,
        })),
    );

    return { nodes, links };
  }

  /**
   * Get topic by name
   */
  async getTopicByName(name: string) {
    const topic = await this.prisma.ontologyTopic.findUnique({
      where: { name },
      include: {
        outgoingRelations: { include: { toTopic: true } },
        incomingRelations: { include: { fromTopic: true } },
        users: { include: { user: { select: { id: true, username: true } } } },
      },
    });

    if (!topic) return null;

    return {
      id: topic.id,
      name: topic.name,
      description: topic.description,
      relatedTopics: topic.relatedTopics,
      frequency: topic.frequency,
      linkedTopics: topic.outgoingRelations.map(rel => ({
        name: rel.toTopic.name,
        weight: rel.weight,
      })),
      incomingFrom: topic.incomingRelations.map(rel => ({
        name: rel.fromTopic.name,
        weight: rel.weight,
      })),
      users: topic.users.map(u => u.user),
    };
  }

  /**
   * Sync from hypertext_backend
   */
  async syncFromHypertextBackend() {
    try {
      const response = await axios.get(`${this.hypertextApiUrl}/hypertext/topic`);
      const { nodes } = response.data;

      for (const node of nodes) {
        await this.prisma.ontologyTopic.upsert({
          where: { name: node.name },
          create: {
            name: node.name,
            description: node.description,
            relatedTopics: node.relatedTopics || [],
            frequency: node.frequency || 1,
          },
          update: {
            ...(node.description && { description: node.description }),
            ...(node.relatedTopics?.length > 0 && { relatedTopics: node.relatedTopics }),
          },
        });
      }

      this.logger.log(`Synced ${nodes.length} topics from hypertext_backend`);
      return { synced: nodes.length };
    } catch (error) {
      this.logger.error(`Sync error: ${error.message}`);
      throw error;
    }
  }
}
