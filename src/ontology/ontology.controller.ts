import { Controller, Get, Post, Param, Body, NotFoundException, Query, ParseIntPipe } from '@nestjs/common';
import { OntologyService } from './ontology.service';
import { CreateTopicDto } from './dto/create-topic.dto';

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

  // ========== New DB-backed endpoints ==========

  // POST /ontology/topic - Create or update a topic (signal from microservice)
  @Post('topic')
  async createOrUpdateTopic(@Body() dto: CreateTopicDto) {
    return this.ontologyService.createOrUpdateTopic(dto);
  }

  // GET /ontology/topics - Get all topics from DB
  @Get('topics')
  async getTopicsFromDb() {
    return this.ontologyService.getTopicsFromDb();
  }

  // GET /ontology/topics/user/:userId - Get topics for a specific user
  @Get('topics/user/:userId')
  async getTopicsByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.ontologyService.getTopicsByUser(userId);
  }
}
