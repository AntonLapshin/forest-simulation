import { Pos, Filter } from "./interfaces";
import { createFlatPos, createGetter, createSetter } from "./utils/getset";
import {
  createIterator,
  createCounter,
  createPosGetter
} from "./utils/iterator";
import { Item } from "./creatures/item";

export class Map {
  private items = {};
  private counter;
  private posGetter;
  private getter;
  private setter;
  public onlyEmpty: Filter;
  private exists: Filter;
  private count = 0;

  constructor(private width: number, private height: number) {
    const flatPos = createFlatPos(width, height);
    const cells = Array(width * height).fill(null);
    const iterator = createIterator(width, height);
    this.counter = createCounter(iterator);
    this.posGetter = createPosGetter(iterator);
    this.getter = createGetter(cells, flatPos);
    this.setter = createSetter(cells, flatPos);
    this.onlyEmpty = pos => this.getter(pos) === null;
    this.exists = pos => this.getter(pos) !== undefined;
  }

  move(pos: Pos, targetPos: Pos): void {
    const item = this.getter(pos);
    item.pos = targetPos;
    this.setter(targetPos, this.getter(pos));
    this.setter(pos, null);
  }

  get freeCellsCount() {
    return this.width * this.height - this.count;
  }

  getItemsBy(type: string): Array<Item> {
    return (this.items[type] || []).slice();
  }

  getAllItems(): Array<Item> {
    return Object.keys(this.items).reduce(
      (acc: any[], group) => acc.concat(this.items[group]),
      []
    );
  }

  addItem(item: Item): void {
    const { type } = item;
    if (!this.items[type]) {
      this.items[type] = [];
    }
    this.items[type].push(item);
    this.setter(item.pos, item);
    this.count++;
  }

  removeItem(item: Item): void {
    const { type } = item;
    const index = this.items[type].indexOf(item);
    this.items[type].splice(index, 1);
    this.setter(item.pos, null);
    this.count--;
  }

  getFreePosRandom(): Pos {
    const index = ~~(Math.random() * this.freeCellsCount);
    return this.posGetter(this.onlyEmpty, index);
  }

  getFreePosAroundRandom([x, y]: Pos, distance: number): Pos {
    const bounds = [x - distance, y - distance, x + distance, y + distance];
    const length = this.counter(this.onlyEmpty, bounds);
    const index = ~~(Math.random() * length);
    return this.posGetter(this.onlyEmpty, index, bounds);
  }
}
