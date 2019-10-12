import { Map } from "../map";
import { Rabbit } from "../creatures/rabbit";
import { INext } from "../interfaces";
import { DNA } from "../utils/dna";

const growthRate = 0;

const dna: DNA = {
  hunger: 0.5,
  laziness: 0.5,
  libido: 0.5,
  curiosity: 0.5
};

const timeToCreateRabbit = (): boolean => Math.random() < growthRate;

const createRabbit = (map: Map) => {
  const randomPos = this.map.getFreePosRandom();
  randomPos && this.map.addItem(new Rabbit(randomPos, this.map, dna));
};

export class RabbitsController implements INext {
  constructor(private map: Map) {
    Array(10).forEach(() => createRabbit(map));
  }

  next() {
    if (!timeToCreateRabbit()) {
      return;
    }
    createRabbit(this.map);
  }
}
