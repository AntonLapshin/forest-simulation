import { Tree } from "./creatures/tree";
import { Rabbit } from "./creatures/rabbit";
import { Map } from "./map";
import { data } from "./data/data";

export const initWorld = (map: Map) => {
  data.forEach(item => {
    if (item.type === "tree") {
      map.addItem(new Tree(item.pos, map));
    }
    if (item.type === "rabbit") {
      map.addItem(new Rabbit(item.pos, map));
    }
  });
};
