import type { RealHistoryItem, RealHistoryParams, RealHistoryPartial } from './types.js';

import { weakUniqueId } from '@mntm/shared';

import { pushNative } from './native.js';
import { realHistory, realCurrent, setHistory } from './real.js';

export const push = (item: Readonly<RealHistoryItem>) => {
  const next = item as RealHistoryItem;

  const id = weakUniqueId();

  // update item
  next.id = id;
  next.params = Object.assign({}, item.params);

  // real
  realHistory.push(next);
  setHistory(realHistory);

  // native
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
