import type { RealHistoryItem, RealHistoryFallback } from './types.js';

import { findIndex, findLastIndex } from './utils_deprecated.js';

import { realHistory, setHistory } from './real.js';

import { pushPartial } from './push.js';

export const changeRoot = (root: string, fallback: RealHistoryFallback) => {
  const sameRoot = (item: RealHistoryItem) => {
    return item.root === root;
  };

  const indexStart = findIndex(realHistory, sameRoot);
  if (indexStart === -1) {
    // not found in history

    // push new root
    const partial: Partial<RealHistoryItem> = fallback;
    partial.root = root;
    pushPartial(partial);
  } else {
    // found in history

    // save ids
    const ids = realHistory.map((item) => item.id);

    // move all root to start
    const indexEnd = findLastIndex(realHistory, sameRoot);
    const savedHistorySlice = realHistory.splice(indexStart, indexEnd - indexStart + 1);
    realHistory.push(...savedHistorySlice);

    // re-assign all ids
    realHistory.forEach((item, i) => {
      item.id = ids[i];
    });

    // update
    setHistory(realHistory);
  }
};
