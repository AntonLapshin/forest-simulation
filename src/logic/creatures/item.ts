import { Pos } from "../interfaces";

export abstract class Item {
  actions: any = {};
  constructor(public type: string, public pos: Pos) {}
}
