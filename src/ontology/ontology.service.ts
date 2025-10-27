// src/ontology/ontology.service.ts
import { Injectable } from '@nestjs/common';
import { DEMO_ONTOLOGY } from './ontology.data';

@Injectable()
export class OntologyService {
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
}
