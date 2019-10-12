import { IGene } from "../interfaces";
import { allSkills } from "./";

export const behaving: IGene = {
  activate(organism: any) {},
  next(organism: any) {
    const { skills } = organism.genome;
    const rates = skills
      .filter(skillName => allSkills[skillName].getBehavioralFactor)
      .map(skillName => ({
        skillName,
        rate: Math.random() * allSkills[skillName].getBehavioralFactor(organism)
      }));
    rates.sort((a, b) => b.rate - a.rate);
    allSkills[rates[0].skillName](organism);
  }
};
