import { Map } from "../map";
import { Tree } from "../creatures/tree";
import { INext } from "../interfaces";

const growthRate = 0.001;

const timeToCreateTree = (): boolean => Math.random() < growthRate;

const createTree = (map: Map) => {
  const randomPos = this.map.getFreePosRandom();
  randomPos && this.map.addItem(new Tree(randomPos, this.map));
};

export class ForestController implements INext {
  constructor(private map: Map) {}

  next() {
    if (!timeToCreateTree()) {
      return;
    }
    createTree(this.map);
  }
}
