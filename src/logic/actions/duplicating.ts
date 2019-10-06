export interface ActionDuplicating {
  duplicationChance: number;
}

export const duplicate = (
  creature: ActionDuplicating,
  duplicate: () => void
) => () => {
  if (Math.random() < creature.duplicationChance) {
    duplicate();
  }
};
