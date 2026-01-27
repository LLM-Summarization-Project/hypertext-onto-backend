import { Controller, Get, Post, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { OntologyService } from './ontology.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { AddUserToTopicDto } from './dto/add-user-to-topic.dto';
import { GetTopicIdDto } from './dto/get-topic-id.dto';
import { GetPedigreeDto } from './dto/get-pedigree.dto';

class ClickTopicDto {
  userId: number;
  clickedWord: string;
  parentTopicId?: string;
}

@Controller('ontology')
export class OntologyController {
  constructor(private readonly ontologyService: OntologyService) { }

  // GET /ontology - Demo ontology data
  @Get()
  getWholeOntology() {
    return this.ontologyService.getOntology();
  }

  // GET /ontology/node/:word - Find node in demo data
  @Get('node/:word')
  getNode(@Param('word') word: string) {
    const node = this.ontologyService.findNodeByWord(decodeURIComponent(word));
    if (!node) throw new NotFoundException('node not found');
    return node;
  }

  // ========== DB-backed endpoints ==========

  // POST /ontology/topic - Create topic + call hypertext_backend for LLM
  @Post('topic')
  async createOrUpdateTopic(@Body() dto: CreateTopicDto) {
    return this.ontologyService.createOrUpdateTopic(dto);
  }

  // POST /ontology/topic/assign-user - Add user to existing topic
  @Post('topic/assign-user')
  async addUserToTopic(@Body() dto: AddUserToTopicDto) {
    return this.ontologyService.addUserToTopic(dto);
  }

  // POST /ontology/topic/id - Get topic ID by name
  @Post('topic/id')
  async getTopicIdByName(@Body() dto: GetTopicIdDto) {
    return this.ontologyService.getTopicIdByName(dto);
  }

  // POST /ontology/click - Handle hypertext click (forward to hypertext_backend)
  @Post('click')
  async handleHypertextClick(@Body() dto: ClickTopicDto) {
    return this.ontologyService.handleHypertextClick(
      dto.userId,
      dto.clickedWord,
      dto.parentTopicId,
    );
  }

  // GET /ontology/topics - Get all topics from DB as graph
  @Get('topics')
  async getTopicsFromDb() {
    return this.ontologyService.getTopicsFromDb();
  }

  // GET /ontology/world - Get world topics (with user details)
  @Get('world')
  async getWorldOntology() {
    return this.ontologyService.getWorldOntology();
  }

  // GET /ontology/topics/user/:userId - Get topics for a specific user (ADMIN: shows blended colors)
  @Get('topics/user/:userId')
  async getTopicsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.ontologyService.getTopicsByUser(userId);
  }

  // GET /ontology/topics/user/:userId/private - Get topics for user with PRIVACY coloring
  // Shows user's color for exclusive nodes, complementary color for shared nodes
  @Get('topics/user/:userId/private')
  async getTopicsByUserPrivate(@Param('userId', ParseIntPipe) userId: number) {
    return this.ontologyService.getTopicsByUserPrivate(userId);
  }

  // GET /ontology/topic/:name - Get topic by name with full details
  @Get('topic/:name')
  async getTopicByName(@Param('name') name: string) {
    const topic = await this.ontologyService.getTopicByName(decodeURIComponent(name));
    if (!topic) throw new NotFoundException(`Topic "${name}" not found`);
    return topic;
  }

  // POST /ontology/pedigree - Get all connected nodes (relatives) for a topic
  // Uses privacy-focused coloring (user's color for exclusive nodes, complementary for shared)
  @Post('pedigree')
  async getPedigree(@Body() dto: GetPedigreeDto) {
    return this.ontologyService.getPedigree(dto.name, dto.userId);
  }

  // POST /ontology/sync - Sync topics from hypertext_backend
  @Post('sync')
  async syncFromHypertextBackend() {
    return this.ontologyService.syncFromHypertextBackend();
  }
}
