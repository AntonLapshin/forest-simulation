import { mutations } from "./genes";

export type Genome = any;

const MUTATION_RATE = 0.5;

const shouldMutate = (): boolean => Math.random() < MUTATION_RATE;

const avg = (a: number, b: number): number => (a + b) / 2;

const combineGenes = (genesA: any, genesB: any) => (acc: any, key: string) => {
  const value = avg(genesA[key], genesB[key]);
  acc[key] = shouldMutate() ? mutations[key](Math.random)(value) : value;
  return acc;
};

const copyGene = (acc: any, [key, value]) => {
  acc[key] = shouldMutate() ? mutations[key](Math.random)(value) : value;
  return acc;
};

export const combineGenomes = (genomeA: Genome, genomeB: Genome): Genome => {
  const newGenome: Genome = {};

  genomeA.skills && (newGenome.skills = [...genomeA.skills]);
  genomeA.meta && (newGenome.meta = { ...genomeA.meta });
  genomeA.meta &&
    (newGenome.meta.generation =
      Math.max(genomeA.meta.generation, genomeB.meta.generation) + 1);
  genomeA.genes &&
    (newGenome.genes = Object.keys(genomeA.genes).reduce(
      combineGenes(genomeA.genes, genomeB.genes),
      {}
    ));

  return newGenome;
};

export const copyGenome = (genome: Genome): Genome => {
  const newGenome: Genome = {};

  genome.skills && (newGenome.skills = [...genome.skills]);
  genome.meta && (newGenome.meta = { ...genome.meta });
  genome.meta && (newGenome.meta.generation = genome.meta.generation + 1);
  genome.genes &&
    (newGenome.genes = Object.entries(genome.genes).reduce(copyGene, {}));

  return newGenome;
};
