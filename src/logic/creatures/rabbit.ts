import { Map } from "../map";
import { Pos, INext } from "../interfaces";
import { ActionAging, age } from "../actions/aging";
import { ActionEating, eat } from "../actions/eating";
import { ActionIdling, idle } from "../actions/idling";
import { ActionMoving, move } from "../actions/moving";
import { Item } from "./item";
import { Tree } from "./tree";

export class Rabbit extends Item
  implements INext, ActionAging, ActionEating, ActionIdling, ActionMoving {
  isAlive = true;
  age = 0;
  lifespan = 300;
  energy = 100;
  maxEnergy = 100;

  constructor(pos: Pos, map: Map) {
    super("rabbit", pos);
    const die = () => map.removeItem(this);
    this.actions.age = age(this, die);
    this.actions.eat = eat(this, (tree: Tree) => {
      map.removeItem(tree);
    });
    this.actions.idle = idle(this, die);
    this.actions.move = move(this, map);
  }

  next() {
    // this.actions.eat(tree);
    // this.actions.move(targetPos);
    this.actions.idle();
    this.actions.age();
  }
}
