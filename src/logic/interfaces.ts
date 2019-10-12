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
  (fn: IteratorFunc, bounds?: any[]): void;
}

export interface GetPos {
  (fn: IteratorFunc, index: number, bounds?: any[]): void;
}

export interface IGene {
  activate(organism: any): void;
  work(organism: any): void;
}
