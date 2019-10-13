import { IGene } from "../interfaces";
import { allSkills } from "./";

interface Factor {
  skillName: string;
  rate: number;
}

const factorsComparison = (a: Factor, b: Factor): number => b.rate - a.rate;

export const behaving: IGene = {
  activate() {},
  next(organism: any) {
    const { skills } = organism.genome;
    const rates = skills
      .filter((skillName: string) => allSkills[skillName].getBehavioralFactor)
      .map((skillName: string) => ({
        skillName,
        rate: Math.random() * allSkills[skillName].getBehavioralFactor(organism)
      }));
    rates.sort(factorsComparison);
    // console.log(JSON.stringify(rates));
    allSkills[rates[0].skillName].do(organism);
  }
};
