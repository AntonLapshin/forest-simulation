export interface ActionIdling {
  isAlive: boolean;
  energy: number;
}

export const idle = (creature: ActionIdling, die: () => void) => (
  food: any
) => {
  if (creature.energy < 1) {
    creature.isAlive = false;
    die();
  }
};
