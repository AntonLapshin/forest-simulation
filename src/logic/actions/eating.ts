export interface ActionEating {
  energy: number;
  maxEnergy: number;
}

export const eat = (
  creature: ActionEating,
  destroyFood: (food: any) => void
) => (food: any) => {
  creature.energy = creature.maxEnergy;
  destroyFood(food);
};
