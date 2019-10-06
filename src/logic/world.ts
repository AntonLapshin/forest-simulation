import { Tree } from "./creatures/tree";
import { Map } from "./map";
import { data } from "./data/data";

export const initWorld = (map: Map) => {
  data.forEach(item => {
    if (item.type === "tree") {
      map.addItem(new Tree(item.pos, map));
    }
  });
};
