import { realHistory, realIndex, setHistory } from './real.js';
import { findLastIndex } from './utils_deprecated.js';

import { moveNative } from './native.js';
import { RealHistoryItem } from './types.js';

export const moveBy = (by: number) => {
  // real
  setHistory(realHistory.slice(0, by));

  // native
  moveNative(by);
};

export const moveToGeneric = (key: keyof RealHistoryItem, value: string) => {
  const to = findLastIndex(realHistory, (item) => item[key] === value);
  if (to === -1) {
    // TODO: warn
    return;
  }
  const by = to - realIndex();
  if (by === 0) {
    // TODO: warn
    return;
  }
  moveBy(by);
};

export const moveToPanel = (panel: string) => {
  moveToGeneric('panel', panel);
};

export const moveToView = (view: string) => {
  moveToGeneric('view', view);
};

export const moveToRoot = (root: string) => {
  moveToGeneric('root', root);
};

export const moveTo = (id: string) => {
  moveToGeneric('id', id);
};
