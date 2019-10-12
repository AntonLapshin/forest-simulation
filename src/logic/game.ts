import { INext } from "./interfaces";
import { Map } from "./map";
import { initWorld } from "./world";
// import { ForestController } from "./controllers/forest-controller";
// import { RabbitsController } from "./controllers/rabbits-controller";

export class Game implements INext {
  public map: Map;
  // private controllers: Array<INext>;

  constructor() {
    this.map = new Map(64, 64);
    initWorld(this.map);
    // this.controllers = [
    //   new ForestController(this.map),
    //   new RabbitsController(this.map)
    // ];
  }

  next() {
    try {
      // this.controllers.forEach(controller => controller.next());
      const allItems = this.map.getAllItems();
      allItems.forEach(item => item.next && item.next());
    } catch (e) {
      console.error(e);
    }
  }

  save(): string {
    const allItems = this.map.getAllItems();
    return JSON.stringify(allItems);
  }
}
