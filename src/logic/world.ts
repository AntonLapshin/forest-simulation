import { genomes } from "./creatures/genomes";
import { Map } from "./map";
import { data } from "./data/data";
import { Organism } from "./creatures/organism";

export const initWorld = (map: Map) => {
  data.forEach(item => {
    map.addItem(new Organism(genomes[item.type], item.pos, map));
  });
};
