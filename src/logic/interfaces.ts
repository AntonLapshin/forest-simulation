export interface INext {
  next(): void;
}

export type Pos = any[];

export interface FlatPos {
  (pos: Pos): number;
}

export interface Filter {
  (pos: Pos): boolean;
}

export interface Iterator {
  (fn: Filter, bounds: any[]): void;
}
