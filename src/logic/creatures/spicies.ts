/*
 * DNA of the spicies
 */

export const spicies = {
  plant: {
    skills: ["aging", "duplicating"],
    props: {
      lifespan: 10000,
      duplicationChance: 0.01,
      duplicationDistance: 3,
      calories: 100,
      defense: 0
    },
    meta: {
      name: "plant",
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
    props: {
      lifespan: 500,
      maxEnergy: 100,
      calories: 500,
      defense: 0.2
    },
    meta: {
      name: "rabbit",
      color: "white"
    }
  }
};
