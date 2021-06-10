import type { Optional } from '@mntm/shared';

export type RealHistoryParams = {
  modal?: Optional<string>;
  popout?: Optional<string>;

  [key: string]: Optional<string>;
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
  params?: Optional<RealHistoryParams>;
};

export type NativeHistoryItem = {
  id: string;
};
