/*
 * Genomes of the spicies
 */

export const genomes = {
  plant: {
    skills: ["aging", "duplicating"],
    genes: {
      lifespan: 1000,
      duplicationChance: 0.02,
      duplicationDistance: 3,
      calories: 100,
      defense: 0
    },
    meta: {
      type: "plant",
      color: "lightgreen"
    }
  },
  rabbit: {
    skills: ["aging", "eating", "reproducing", "idling", "moving", "behaving"],
    behavioralFactors: {
      hunger: 0.5,
      laziness: 0.5,
      libido: 0.5
    },
    genes: {
      lifespan: 500,
      maxEnergy: 100,
      calories: 500,
      defense: 0.2
    },
    meta: {
      type: "rabbit",
      color: "white"
    }
  }
};
