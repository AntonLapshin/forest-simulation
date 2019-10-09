export type DNA = any;

const MUTATION_RATE = 0.5;
const MUTATION_STEP = 0.05;

const shouldMutate = (): boolean => Math.random() < MUTATION_RATE;

const avg = (a: number, b: number): number => (a + b) / 2;

export const mutate = (random: any) => (value: number): number => {
  value = value + random() * MUTATION_STEP * 2 - MUTATION_STEP;
  return Math.min(Math.max(value, 0), 1);
};

const copyGene = (dna1: DNA, dna2: DNA) => (acc: any, gene: string) => {
  const value = avg(dna1[gene], dna2[gene]);
  acc[gene] = shouldMutate() ? mutate(Math.random)(value) : value;
  return acc;
};

export const copyDNA = (dna1: DNA, dna2: DNA): DNA =>
  Object.keys(dna1).reduce(copyGene(dna1, dna2), {});
