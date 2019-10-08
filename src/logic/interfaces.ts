export interface INext {
  next(): void;
}

export type Pos = any[];

export interface FlatPos {
  (pos: Pos): number;
}

export interface IteratorFunc {
  (pos: Pos): boolean;
}

export interface Iterator {
  (fn: IteratorFunc, bounds?: any[]): void;
}

export interface IteratorCounter {
  (fn: IteratorFunc, bounds?: any[]): void;
}

export interface IteratorCounterPos {
  (fn: IteratorFunc, index: number, bounds?: any[]): void;
}
