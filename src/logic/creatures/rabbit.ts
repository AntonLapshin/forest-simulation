import { Map } from "../map";
import { Pos, INext } from "../interfaces";
import { ActionAging, age } from "../actions/aging";
import { ActionEating, eat } from "../actions/eating";
import { ActionIdling, idle } from "../actions/idling";
import { ActionMoving, move } from "../actions/moving";
import { ActionReproducting, reproduce } from "../actions/reproducting";
import { Item } from "./item";
import { getDistance } from "../utils/axis";
import { DNA } from "../utils/dna";

const visionRadius = 5;

export class Rabbit extends Item
  implements
    INext,
    ActionAging,
    ActionEating,
    ActionIdling,
    ActionMoving,
    ActionReproducting {
  isAlive = true;
  age = 0;
  lifespan = 300;
  energy = 100;
  maxEnergy = 100;

  constructor(pos: Pos, private map: Map, public dna: DNA) {
    super("rabbit", pos);
    this.actions.age = age(this, map);
    this.actions.eat = eat(this, map);
    this.actions.idle = idle(this, map);
    this.actions.move = move(this, map);
    this.actions.reproduce = reproduce(this, map, (pos: Pos, dna: DNA) => {
      map.addItem(new Rabbit(pos, map, dna));
    });
  }

  next() {
    const hunger =
      this.dna.hunger * ((this.maxEnergy - this.energy) / this.maxEnergy);
    const laziness =
      this.dna.laziness * (1 - (this.maxEnergy - this.energy) / this.maxEnergy);
    const libido =
      this.dna.libido * (1 - (this.maxEnergy - this.energy) / this.maxEnergy);
    const rates = [
      {
        name: "hunger",
        rate: Math.random() * hunger
      },
      {
        name: "laziness",
        rate: Math.random() * laziness
      },
      {
        name: "libido",
        rate: Math.random() * libido
      }
    ];
    rates.sort((a, b) => b.rate - a.rate);

    if (rates[0].name === "hunger") {
      const closestTree = this.map.getClosest(this.pos, "tree", visionRadius);
      // console.log({ pos: this.pos, closestTree });
      if (closestTree) {
        if (getDistance(this.pos, closestTree.pos) === 1) {
          // console.log("eat");
          this.actions.eat(closestTree);
        } else {
          // console.log("move");
          this.actions.move(closestTree.pos);
        }
      } else {
        const randomFreePos = this.map.getFreePosAroundRandom(this.pos, 1);
        this.actions.move(randomFreePos);
      }
    }

    if (rates[0].name === "libido") {
      const closestRabbit = this.map.getClosest(
        this.pos,
        "rabbit",
        visionRadius
      );
      // console.log({ pos: this.pos, closestTree });
      if (closestRabbit) {
        if (getDistance(this.pos, closestRabbit.pos) === 1) {
          // console.log("eat");
          this.actions.reproduce(closestRabbit);
        } else {
          // console.log("move");
          this.actions.move(closestRabbit.pos);
        }
      } else {
        const randomFreePos = this.map.getFreePosAroundRandom(this.pos, 1);
        this.actions.move(randomFreePos);
      }
    }

    this.actions.idle();
    this.actions.age();
  }
}
