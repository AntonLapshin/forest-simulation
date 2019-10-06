import { Map } from "../map";
import { Pos, INext } from "../interfaces";
import { ActionAging, age } from "../actions/aging";
import { ActionDuplicating, duplicate } from "../actions/duplicating";
import { Item } from "./item";

const distance = 3;

export class Tree extends Item
  implements INext, ActionAging, ActionDuplicating {
  isAlive = true;
  age = 0;
  lifespan = 1000;
  duplicationChance = 0.001;

  constructor(pos: Pos, map: Map) {
    super("tree", pos);
    this.actions.age = age(this, () => map.removeItem(this));
    this.actions.duplicate = duplicate(this, () => {
      const randomPos = map.getFreePosAroundRandom(this.pos, distance);
      randomPos && map.addItem(new Tree(randomPos, map));
    });
  }

  next() {
    this.actions.duplicate();
    this.actions.age();
  }
}
