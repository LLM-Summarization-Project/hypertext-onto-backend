import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OntologyService } from './ontology.service';

@Controller('ontology')
export class OntologyController {
  constructor(private readonly ontologyService: OntologyService) {}

  // GET /ontology
  @Get()
  getWholeOntology() {
    return this.ontologyService.getOntology();
  }

  // GET /ontology/node/การเงิน
  @Get('node/:word')
  getNode(@Param('word') word: string) {
    const node = this.ontologyService.findNodeByWord(decodeURIComponent(word));
    if (!node) throw new NotFoundException('node not found');
    return node;
  }
}
