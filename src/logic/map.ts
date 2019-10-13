import { Pos, IteratorFunc, Iterator, Count, GetPos } from "./interfaces";
import { posToIndex, getItem, setItem } from "./utils/getset";
import { iterator, count, getPos } from "./utils/iterator";
import { getDistance } from "./utils/axis";

const filterPos = ([x, y]: Pos, filter: IteratorFunc) => (pos: Pos) =>
  filter(pos) && (x !== pos[0] || y !== pos[1]);

export class Map {
  private items = {};
  private iterateCells: Iterator;
  private countItems: Count;
  private getNPos: GetPos;
  private getAt: (pos: Pos) => any;
  private setTo: (pos: Pos, value: any) => void;
  public onlyEmpty: IteratorFunc;
  // private exists: IteratorFunc;
  private count = 0;

  constructor(private width: number, private height: number) {
    const toIndex = posToIndex([width, height]);
    const cells = Array(width * height).fill(null);
    this.iterateCells = iterator([width, height]);
    this.countItems = count(this.iterateCells);
    this.getNPos = getPos(this.iterateCells);
    this.getAt = getItem(cells, toIndex);
    this.setTo = setItem(cells, toIndex);
    this.onlyEmpty = pos => this.getAt(pos) === null;
    // this.exists = pos => this.getAt(pos) !== undefined;
  }

  move(item: any, targetPos: Pos): void {
    const oldPos = item.pos;
    item.pos = targetPos;
    this.setTo(targetPos, item);
    this.setTo(oldPos, null);
  }

  get freeCellsCount() {
    return this.width * this.height - this.count;
  }

  getItemsBy(type: string): Array<any> {
    return (this.items[type] || []).slice();
  }

  getAllItems(): Array<any> {
    return Object.values(this.items).reduce(
      (acc: any[], item: any) => acc.concat(item),
      []
    );
  }

  addItem(item: any): void {
    const { type } = item.genome.meta;
    if (!this.items[type]) {
      this.items[type] = [];
    }
    this.items[type].push(item);
    this.setTo(item.pos, item);
    this.count++;
  }

  removeItem(item: any): void {
    const { type } = item.genome.meta;
    const index = this.items[type].indexOf(item);
    this.items[type].splice(index, 1);
    this.setTo(item.pos, null);
    this.count--;
  }

  getFreePosRandom(): Pos {
    const index = ~~(Math.random() * this.freeCellsCount);
    return this.getNPos(this.onlyEmpty, index);
  }

  getFreePosAroundRandom([x, y]: Pos, distance: number): Pos {
    const bounds = [x - distance, y - distance, x + distance, y + distance];
    const length = this.countItems(filterPos([x, y], this.onlyEmpty), bounds);
    const index = ~~(Math.random() * length);
    return this.getNPos(filterPos([x, y], this.onlyEmpty), index, bounds);
  }

  getClosest([x, y]: Pos, filter: IteratorFunc, radius: number): any {
    let closestItem = null;
    let minDistance = Number.MAX_VALUE;
    this.iterateCells(
      (pos: Pos) => {
        const item = this.getAt(pos);
        if (!item || !filter(item)) {
          return true;
        }
        const distance = getDistance([x, y], pos);
        if (!closestItem || distance < minDistance) {
          closestItem = item;
          minDistance = distance;
        }
      },
      [x - radius, y - radius, x + radius, y + radius]
    );
    return closestItem;
  }
}
