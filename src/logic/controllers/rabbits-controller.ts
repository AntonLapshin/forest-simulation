import { Map } from "../map";
import { Rabbit } from "../creatures/rabbit";
import { INext } from "../interfaces";
import { DNA } from "../utils/dna";

const growthRate = 0.01;

const dna: DNA = {
  hunger: 0.5,
  laziness: 0.5,
  libido: 0.5,
  curiosity: 0.5
};

export class RabbitsController implements INext {
  constructor(private map: Map) {}

  next() {
    if (Math.random() < growthRate) {
      const randomPos = this.map.getFreePosRandom();
      randomPos && this.map.addItem(new Rabbit(randomPos, this.map, dna));
    }
  }
}
