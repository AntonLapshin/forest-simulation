import { Map } from "../map";
import { Pos, INext } from "../interfaces";
import { ActionAging, age } from "../actions/aging";
import { ActionDuplicating, duplicate } from "../actions/duplicating";
import { Item } from "./item";

export class Tree extends Item
  implements INext, ActionAging, ActionDuplicating {
  isAlive = true;
  age = 0;
  lifespan = 1000;
  duplicationChance = 0.001;

  constructor(pos: Pos, map: Map) {
    super("tree", pos);
    this.actions.age = age(this, map);
    this.actions.duplicate = duplicate(this, map, (pos: Pos) => {
      map.addItem(new Tree(pos, map));
    });
  }

  next() {
    this.actions.duplicate();
    this.actions.age();
  }
}
