import type { RealHistoryItem } from './types.js';

import { weakUniqueId } from '@mntm/shared';

import { pushNative } from './native.js';
import { realHistory, realCurrent, setHistory } from './real.js';

export const push = (item: RealHistoryItem) => {
  const id = weakUniqueId();

  // update item
  item.id = id;
  item.params = Object.assign({}, item.params);

  // real
  realHistory.push(item);
  setHistory(realHistory);

  // native
  pushNative({ id });
};

export const pushPartial = (item: Partial<RealHistoryItem>) => {
  push(Object.assign({}, realCurrent(), item));
};

export const pushPanel = (panel: string) => {
  pushPartial({ panel });
};

export const pushView = (panel: string, view: string) => {
  pushPartial({ panel, view });
};

export const pushParams = (params: RealHistoryItem['params']) => {
  pushPartial({ params });
};

export const pushPartialParams = (params: RealHistoryItem['params']) => {
  const current = realCurrent();
  pushParams(Object.assign({}, current.params, params));
};
