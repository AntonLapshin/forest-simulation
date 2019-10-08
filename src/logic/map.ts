import { Pos, IteratorFunc } from "./interfaces";
import { createFlatPos, createGetter, createSetter } from "./utils/getset";
import {
  createIterator,
  createIteratorCounter,
  createIteratorPos
} from "./utils/iterator";
import { getDistance } from "./utils/axis";
import { Item } from "./creatures/item";

export class Map {
  private items = {};
  private iterator;
  private counter;
  private posGetter;
  private getCell: (pos: Pos) => Item;
  private setCell: (pos: Pos, value: Item) => void;
  public onlyEmpty: IteratorFunc;
  private exists: IteratorFunc;
  private count = 0;

  constructor(private width: number, private height: number) {
    const flatPos = createFlatPos(width, height);
    const cells = Array(width * height).fill(null);
    this.iterator = createIterator(width, height);
    this.counter = createIteratorCounter(this.iterator);
    this.posGetter = createIteratorPos(this.iterator);
    this.getCell = createGetter(cells, flatPos);
    this.setCell = createSetter(cells, flatPos);
    this.onlyEmpty = pos => this.getCell(pos) === null;
    this.exists = pos => this.getCell(pos) !== undefined;
  }

  move(pos: Pos, targetPos: Pos): void {
    const item = this.getCell(pos);
    item.pos = targetPos;
    this.setCell(targetPos, this.getCell(pos));
    this.setCell(pos, null);
  }

  get freeCellsCount() {
    return this.width * this.height - this.count;
  }

  getItemsBy(type: string): Array<Item> {
    return (this.items[type] || []).slice();
  }

  getAllItems(): Array<Item> {
    return Object.keys(this.items).reduce(
      (acc: any[], type) => acc.concat(this.items[type]),
      []
    );
  }

  addItem(item: Item): void {
    const { type } = item;
    if (!this.items[type]) {
      this.items[type] = [];
    }
    this.items[type].push(item);
    this.setCell(item.pos, item);
    this.count++;
  }

  removeItem(item: Item): void {
    const { type } = item;
    const index = this.items[type].indexOf(item);
    this.items[type].splice(index, 1);
    this.setCell(item.pos, null);
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

  getClosest([x, y]: Pos, type: string, radius: number): Item {
    let closestItem = null;
    let minDistance = Number.MAX_VALUE;
    this.iterator(
      (pos: Pos) => {
        const item = this.getCell(pos);
        if (item && item.type === type) {
          const distance = getDistance([x, y], pos);
          if (!closestItem || distance < minDistance) {
            closestItem = item;
            minDistance = distance;
          }
        }
      },
      [x - radius, y - radius, x + radius, y + radius]
    );
    return closestItem;
  }
}
