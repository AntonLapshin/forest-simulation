import { Genome } from "../dna/genome";
import { allSkills } from "../skills";
import { Pos } from "../interfaces";
import { Map } from "../map";

export class Organism {
  private activatedSkills: {} = {};

  constructor(private genome: Genome, private pos: Pos, public map: Map) {}

  next(): void {
    this.genome.skills.forEach((skillName: string) => {
      if (!this.activatedSkills[skillName] && allSkills[skillName]) {
        allSkills[skillName].activate(this);
        this.activatedSkills[skillName] = true;
      }
      allSkills[skillName].next && allSkills[skillName].next(this);
    });
  }
}
