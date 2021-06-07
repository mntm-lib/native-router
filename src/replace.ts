import type { RealHistoryItem } from './types.js';

import { realCurrent, realIndex, realHistory, setHistory } from './real.js';

import { replaceNative } from './native.js';

export const replace = (item: RealHistoryItem) => {
  const id = realCurrent().id;

  // update item
  item.id = id;
  item.params = Object.assign({}, item.params);

  // real
  realHistory[realIndex()] = item;
  setHistory(realHistory);

  // native
  replaceNative({ id });
};

export const replacePartial = (item: Partial<RealHistoryItem>) => {
  replace(Object.assign({}, realCurrent(), item));
};

export const replacePanel = (panel: string) => {
  replacePartial({ panel });
};

export const replaceView = (panel: string, view: string) => {
  replacePartial({ panel, view });
};
