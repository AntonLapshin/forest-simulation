import { Map } from "../map";
import { Rabbit } from "../creatures/rabbit";
import { INext } from "../interfaces";
import { DNA } from "../utils/dna";

const growthRate = 0.05;

const dna: DNA = {
  hunger: 0.5,
  laziness: 0.5,
  libido: 0.5,
  curiosity: 0.5
};

const timeToCreateRabbit = (): boolean => {
  return Math.random() < growthRate;
};

export class RabbitsController implements INext {
  constructor(private map: Map) {}

  next() {
    if (!timeToCreateRabbit()) {
      return;
    }
    const randomPos = this.map.getFreePosRandom();
    console.log(randomPos);
    randomPos && this.map.addItem(new Rabbit(randomPos, this.map, dna));
  }
}
