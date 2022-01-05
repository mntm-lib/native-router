import type { RealHistoryFallback, RealHistoryItem, RealHistoryPartial } from './types.js';

import { findIndex, findLastIndex, isPartialEqual } from '@mntm/shared';

import { afterUpdateHistory } from './history.js';
import { realCurrent, realHistory, realIndex, setHistory } from './real.js';
import { pushPartial } from './push.js';
import { moveTo } from './move.js';
import { replacePartial } from './replace.js';

export const changeRoot = (root: string, fallback: Readonly<RealHistoryFallback>) => {
  const partial = fallback as RealHistoryPartial;
  const current = realCurrent();

  const sameRoot = (item: RealHistoryItem) => {
    return item.root === root;
  };

  const indexStart = findIndex(realHistory, sameRoot);

  if (indexStart === -1) {
    // Not found in history

    // push new root
    partial.root = root;
    pushPartial(partial);

    return;
  }

  if (current.root === root) {
    // Change to same root

    const indexCurrent = realIndex();

    if (indexStart === indexCurrent) {
      // Nowhere to move

      replacePartial(partial);

      return;
    }

    const start = realHistory[indexStart];

    // Started not with fallback
    if (!isPartialEqual(partial, start)) {
      afterUpdateHistory(() => {
        replacePartial(partial);
      });
    }

    moveTo(indexStart);

    return;
  }

  // Found in history

  // save ids
  const ids = realHistory.map((item) => item.id);

  // Move all root to start
  const indexEnd = findLastIndex(realHistory, sameRoot);
  const savedHistorySlice = realHistory.splice(indexStart, indexEnd - indexStart + 1);

  realHistory.push.apply(realHistory, savedHistorySlice);

  // Re-assign all ids
  realHistory.forEach((item, i) => {
    item.id = ids[i];
  });

  // Update
  setHistory(realHistory);
};
