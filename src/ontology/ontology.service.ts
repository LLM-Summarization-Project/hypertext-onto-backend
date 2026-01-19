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

  // Helper to convert hex to RGB
  private hexToRgb(hex: string) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Helper to convert RGB to hex
  private rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Generate a color from user ID (consistent hashing)
  private hashUserIdToColor(userId: number) {
    // Simple hash to get a Hue (0-360)
    // Use a large prime multiplier to scatter values
    const hash = (userId * 2654435761) % 360;

    // Convert HSL to RGB (simple conversion for consistent saturation/lightness)
    // Saturation 70%, Lightness 50% for good visibility
    const s = 0.7;
    const l = 0.5;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hash / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (0 <= hash && hash < 60) { r = c; g = x; b = 0; }
    else if (60 <= hash && hash < 120) { r = x; g = c; b = 0; }
    else if (120 <= hash && hash < 180) { r = 0; g = c; b = x; }
    else if (180 <= hash && hash < 240) { r = 0; g = x; b = c; }
    else if (240 <= hash && hash < 300) { r = x; g = 0; b = c; }
    else if (300 <= hash && hash < 360) { r = c; g = 0; b = x; }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  // Blend multiple colors
  private blendColors(userIds: number[]): string {
    if (userIds.length === 0) return '#cccccc'; // Default gray if no users

    let totalR = 0, totalG = 0, totalB = 0;

    for (const uid of userIds) {
      const color = this.hashUserIdToColor(uid);
      totalR += color.r;
      totalG += color.g;
      totalB += color.b;
    }

    // Average
    const avgR = Math.round(totalR / userIds.length);
    const avgG = Math.round(totalG / userIds.length);
    const avgB = Math.round(totalB / userIds.length);

    return this.rgbToHex(avgR, avgG, avgB);

  }

  // Get complementary (opposite) color
  private getComplementaryColor(userId: number): string {
    const userColor = this.hashUserIdToColor(userId);
    // Complementary color = 255 - each RGB component
    return this.rgbToHex(
      255 - userColor.r,
      255 - userColor.g,
      255 - userColor.b
    );
  }

  // Get user's main color as hex
  private getUserColor(userId: number): string {
    const rgb = this.hashUserIdToColor(userId);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  /**
   * Get topics for user with PRIVACY-focused coloring:
   * - Nodes ONLY owned by this user = user's main color
   * - Nodes shared with others = complementary/opposite color (just shows "shared", not who)
   */
  async getTopicsByUserPrivate(userId: number) {
    const topics = await this.prisma.ontologyTopic.findMany({
      where: { users: { some: { userId } } },
      include: {
        outgoingRelations: true,
        users: { select: { userId: true } }
      },
      orderBy: { frequency: 'desc' },
    });

    // Filter out topics with no users
    const topicsWithUsers = topics.filter((topic) => topic.users.length > 0);
    const topicIds = new Set(topicsWithUsers.map((t) => t.id));

    const userMainColor = this.getUserColor(userId);
    const sharedColor = this.getComplementaryColor(userId);

    const nodes = topicsWithUsers.map((topic) => {
      const userIds = topic.users.map(u => u.userId);
      // Check if this node is ONLY owned by this user
      const isExclusive = userIds.length === 1 && userIds[0] === userId;

      return {
        id: topic.id,
        target: topic.name,
        weight: topic.frequency,
        description: topic.description,
        relatedTopics: topic.relatedTopics,
        color: isExclusive ? userMainColor : sharedColor,
        isShared: !isExclusive, // Optional: frontend can use this for UI hints
      };
    });

    const links = topicsWithUsers.flatMap((topic) =>
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
   * Get all topics as graph
   */
  async getTopicsFromDb() {
    const topics = await this.prisma.ontologyTopic.findMany({
      include: {
        outgoingRelations: true,
        users: { select: { userId: true } }
      },
      orderBy: { frequency: 'desc' },
    });

    // Filter out topics with no users (colorless nodes)
    const topicsWithUsers = topics.filter((topic) => topic.users.length > 0);
    const topicIdsWithUsers = new Set(topicsWithUsers.map((t) => t.id));

    const nodes = topicsWithUsers.map((topic) => {
      const userIds = topic.users.map(u => u.userId);
      const blendedColor = this.blendColors(userIds);

      return {
        id: topic.id,
        target: topic.name,
        weight: topic.frequency,
        description: topic.description,
        relatedTopics: topic.relatedTopics,
        color: blendedColor,
      };
    });

    // Only include links where both source and target have users
    const links = topicsWithUsers.flatMap((topic) =>
      topic.outgoingRelations
        .filter((rel) => topicIdsWithUsers.has(rel.toTopicId))
        .map((rel) => ({
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
      include: {
        outgoingRelations: true,
        users: { select: { userId: true } }
      },
      orderBy: { frequency: 'desc' },
    });

    // Filter out topics with no users (colorless nodes) - this is already filtered by userId above,
    // but we keep this for consistency and safety
    const topicsWithUsers = topics.filter((topic) => topic.users.length > 0);
    const topicIds = new Set(topicsWithUsers.map((t) => t.id));

    const nodes = topicsWithUsers.map((topic) => {
      const userIds = topic.users.map(u => u.userId);
      const blendedColor = this.blendColors(userIds);

      return {
        id: topic.id,
        target: topic.name,
        weight: topic.frequency,
        description: topic.description,
        relatedTopics: topic.relatedTopics,
        color: blendedColor,
      };
    });

    const links = topicsWithUsers.flatMap((topic) =>
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
