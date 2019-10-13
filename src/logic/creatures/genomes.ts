/*
 * Genomes of the spicies
 */

export const genomes = {
  plant: {
    skills: ["aging", "duplicating"],
    genes: {
      lifespan: 1000,
      duplicationChance: 0.01,
      duplicationDistance: 3,
      calories: 300,
      defense: 0
    },
    meta: {
      type: "plant",
      color: "lightgreen",
      generation: 0
    }
  },
  rabbit: {
    skills: ["aging", "eating", "reproducing", "idling", "moving", "behaving"],
    genes: {
      lifespan: 200,
      maxEnergy: 200,
      calories: 500,
      defense: 5,
      attack: 5,
      visionRadius: 5,
      hunger: 0.7,
      laziness: 0.1,
      libido: 0.5
    },
    meta: {
      type: "rabbit",
      color: "white",
      generation: 0
    }
  }
};
