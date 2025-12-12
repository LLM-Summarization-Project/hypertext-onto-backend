// src/ontology/ontology.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEMO_ONTOLOGY } from './ontology.data';
import { CreateTopicDto } from './dto/create-topic.dto';

@Injectable()
export class OntologyService {
  constructor(private readonly prisma: PrismaService) { }

  // Static demo data (existing functionality)
  getOntology() {
    return DEMO_ONTOLOGY;
  }

  findNodeByWord(word: string) {
    let bestMatch: any = null;

    function dfs(node: any) {
      if (node.target === word || node.word === word) {
        // keep node if no best match yet OR this one has children (more info)
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

  // ========== New DB-backed methods ==========

  /**
   * Create or update a topic, increment frequency, and link to user
   */
  async createOrUpdateTopic(dto: CreateTopicDto) {
    // 1. Upsert the topic (create if not exists, increment frequency if exists)
    const topic = await this.prisma.ontologyTopic.upsert({
      where: { name: dto.name },
      create: {
        name: dto.name,
        description: dto.description,
        frequency: 1,
      },
      update: {
        frequency: { increment: 1 },
        // Optionally update description if provided
        ...(dto.description && { description: dto.description }),
      },
    });

    // 2. Link user to topic (create if not exists)
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
      update: {}, // Do nothing if already linked
    });

    // 3. Return the topic with user links
    return this.prisma.ontologyTopic.findUnique({
      where: { id: topic.id },
      include: {
        users: {
          include: { user: { select: { id: true, username: true } } },
        },
      },
    });
  }

  /**
   * Get all topics from DB as graph format (nodes + links)
   */
  async getTopicsFromDb() {
    const topics = await this.prisma.ontologyTopic.findMany({
      include: {
        outgoingRelations: true,
      },
      orderBy: { frequency: 'desc' },
    });

    // Transform to graph format
    const nodes = topics.map((topic) => ({
      id: topic.id,
      target: topic.name,
      weight: topic.frequency,
      description: topic.description,
    }));

    // Collect all links from outgoingRelations
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
   * Get topics for a specific user as graph format
   */
  async getTopicsByUser(userId: number) {
    const topics = await this.prisma.ontologyTopic.findMany({
      where: {
        users: { some: { userId } },
      },
      include: {
        outgoingRelations: true,
      },
      orderBy: { frequency: 'desc' },
    });

    // Get all topic IDs for this user
    const topicIds = new Set(topics.map((t) => t.id));

    // Transform to graph format
    const nodes = topics.map((topic) => ({
      id: topic.id,
      target: topic.name,
      weight: topic.frequency,
      description: topic.description,
    }));

    // Only include links where both source and target belong to user's topics
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
}
