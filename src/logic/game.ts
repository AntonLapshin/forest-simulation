import { INext } from "./interfaces";
import { Map } from "./map";
import { initWorld } from "./world";
import { ForestController } from "./controllers/forest-controller";

export class Game implements INext {
  public map: Map;
  private controllers: Array<INext>;

  constructor() {
    this.map = new Map(64, 64);
    initWorld(this.map);
    this.controllers = [new ForestController(this.map)];
  }

  next() {
    this.controllers.forEach(controller => controller.next());
    const allItems = this.map.getAllItems();
    allItems.forEach(item => (item as any).next && (item as any).next());
  }

  save(): string {
    const allItems = this.map.getAllItems();
    return JSON.stringify(allItems);
  }
}
