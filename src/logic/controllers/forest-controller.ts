import { Map } from "../map";
import { Tree } from "../creatures/tree";
import { INext } from "../interfaces";

const growthRate = 0.001;

export class ForestController implements INext {
  constructor(private map: Map) {}

  next() {
    if (Math.random() < growthRate) {
      const randomPos = this.map.getFreePosRandom();
      randomPos && this.map.addItem(new Tree(randomPos, this.map));
    }
  }
}
