import type { RealHistoryItem, RealHistoryParams, RealHistoryPartial } from './types.js';

import { fastUniqueId } from '@mntm/shared';

import { pushNative } from './native.js';
import { realCurrent, realHistory, setHistory } from './real.js';

import { parseLocation, parseLocationParams } from './location.js';

export const push = (item: Readonly<RealHistoryItem>) => {
  const next = item as RealHistoryItem;

  const id = fastUniqueId();

  // Update item
  next.id = id;
  next.params = Object.assign({}, item.params);

  // Real
  realHistory.push(next);
  setHistory(realHistory);

  // Native
  pushNative({ id });
};

export const pushPartial = (item: Readonly<RealHistoryPartial>) => {
  push(Object.assign({}, realCurrent(), item));
};

export const pushPanel = (panel: string) => {
  pushPartial({ panel });
};

export const pushView = (panel: string, view: string) => {
  pushPartial({ panel, view });
};

export const pushParams = (params: Readonly<RealHistoryParams>) => {
  pushPartial({ params });
};

export const pushPartialParams = (params: Readonly<RealHistoryParams>) => {
  const current = realCurrent();

  pushParams(Object.assign({}, current.params, params));
};

export const pushClearParams = () => {
  pushParams({});
};

export const pushModal = (modal: string) => {
  pushPartialParams({ modal });
};

export const pushPopout = (popout: string) => {
  pushPartialParams({ popout });
};

export const pushLocation = (location: string | URL) => {
  push(parseLocation(location));
};

export const pushLocationParams = (locationParams: string | URLSearchParams) => {
  pushParams(parseLocationParams(locationParams));
};

export const pushPartialLocationParams = (locationParams: string | URLSearchParams) => {
  pushPartialParams(parseLocationParams(locationParams));
};
