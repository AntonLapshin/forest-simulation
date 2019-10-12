export type DNA = any;

const MUTATION_RATE = 0.5;
const MUTATION_STEP = 0.05;

const shouldMutate = (): boolean => Math.random() < MUTATION_RATE;

const avg = (a: number, b: number): number => (a + b) / 2;

export const mutateGene = (random: any) => (value: number): number => {
  value = value + random() * MUTATION_STEP * 2 - MUTATION_STEP;
  return Math.min(Math.max(value, 0), 1);
};

const combineGenes = (dna1: DNA, dna2: DNA) => (acc: any, gene: string) => {
  const value = avg(dna1[gene], dna2[gene]);
  acc[gene] = shouldMutate() ? mutateGene(Math.random)(value) : value;
  return acc;
};

const copyGene = (dna: DNA) => (acc: any, gene: string) => {
  acc[gene] = shouldMutate() ? mutateGene(Math.random)(dna[gene]) : dna[gene];
  return acc;
};

export const combineDNAs = (dna1: DNA, dna2: DNA): DNA =>
  Object.keys(dna1).reduce(combineGenes(dna1, dna2), {});

export const copyDNA = (dna: DNA): DNA =>
  Object.keys(dna).reduce(copyGene(dna), {});
