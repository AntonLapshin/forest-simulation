export interface INext {
  next(): void;
}

export type Pos = number[];

export interface PosToIndex {
  (pos: Pos): number;
}

export interface IteratorFunc {
  (pos: Pos): boolean;
}

export interface Iterator {
  (fn: IteratorFunc, bounds?: any[]): void;
}

export interface Count {
  (fn: IteratorFunc, bounds?: any[]): number;
}

export interface GetPos {
  (fn: IteratorFunc, index: number, bounds?: any[]): Pos;
}

export interface IGene {
  activate(organism: any): void;
  do?: any;
  next?(organism: any): void;
}
