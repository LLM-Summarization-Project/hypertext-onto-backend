import { Injectable } from '@nestjs/common';
import { DEMO_ONTOLOGY } from './ontology.data';

@Injectable()
export class OntologyService {
  // later you can load from DB, file, etc.
  getOntology() {
    return DEMO_ONTOLOGY;
  }

  // bonus: lookup by node text, e.g. /ontology/node/การเงิน
  findNodeByWord(word: string) {
    // very naive DFS over relations
    function dfs(node: any): any | null {
      if (node.target === word || node.word === word) return node;
      if (!node.relations) return null;
      for (const child of node.relations) {
        const found = dfs(child);
        if (found) return found;
      }
      return null;
    }

    // root has shape {word, relations:[...]}
    if (DEMO_ONTOLOGY.word === word) return DEMO_ONTOLOGY;
    for (const rel of DEMO_ONTOLOGY.relations) {
      const found = dfs(rel);
      if (found) return found;
    }

    return null;
  }
}
