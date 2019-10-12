import { DNA } from "../utils/dna";
import { allGenes } from "../genes";
import { Pos } from "../interfaces";
import { Map } from "../map";

export class Organism {
  private activatedGenes: {};

  constructor(private dna: DNA, private pos: Pos, public map: Map) {}

  next(): void {
    Object.keys(this.dna).forEach((geneName: string) => {
      if (!this.activatedGenes[geneName] && allGenes[geneName]) {
        allGenes[geneName].activate(this);
        this.activatedGenes[geneName] = true;
      }
      allGenes[geneName].work(this);
    });
  }
}
