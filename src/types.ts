export type Nullable<T> = T | null | undefined;

export type RealHistoryParams = {
  modal?: Nullable<string>;
  popout?: Nullable<string>;

  [key: string]: Nullable<string>;
};

export type RealHistoryItem = {
  id: string;

  root: string;
  view: string;
  panel: string;
  params: RealHistoryParams;
};

export type RealHistoryFallback = {
  view: string;
  panel: string;
  params?: RealHistoryParams;
};

export type NativeHistoryItem = {
  id: string;
};
