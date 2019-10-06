export interface ActionAging {
  isAlive: boolean;
  lifespan: number;
  age: number;
}

export const age = (creature: ActionAging, die: () => void) => () => {
  creature.age++;
  if (creature.age === creature.lifespan) {
    creature.isAlive = false;
    die();
  }
};
