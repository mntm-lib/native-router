import type { RealHistoryItem } from './types.js';

import { __dev__, findLastIndex, isShallowEqual, isPartialEqual } from '@mntm/shared';

import { realHistory, realIndex, setHistory } from './real.js';
import { moveNative } from './native.js';
import { history } from './history.js';

export const canMoveTo = (to: number) => {
  return to !== -1 && to < realIndex();
};

export const canMoveBy = (by: number) => {
  const to = realIndex() + by;
  return canMoveTo(to);
};

export const moveByUnsafe = (by: number) => {
  // real
  setHistory(realHistory.slice(0, by));

  // native
  moveNative(by);
};

export const moveToUnsafe = (to: number) => {
  const by = to - realIndex();
  moveByUnsafe(by);
};

export const moveBy = (by: number) => {
  if (__dev__) {
    if (!canMoveBy(by)) {
      console.warn('Nowhere to move.');
      console.warn('Make sure you are doing it right.');
    }
  }

  if (canMoveBy(by)) {
    moveByUnsafe(by);
  }
};

export const moveTo = (to: number) => {
  if (__dev__) {
    if (!canMoveTo(to)) {
      console.warn('Nowhere to move.');
      console.warn('Make sure you are doing it right.');
    }
  }

  if (canMoveTo(to)) {
    moveToUnsafe(to);
  }
};

export const moveToPartial = (item: Partial<RealHistoryItem>) => {
  const to = findLastIndex(realHistory, (real) => isPartialEqual(item, real));
  moveTo(to);
};

export const moveToParams = (params: RealHistoryItem['params']) => {
  const to = findLastIndex(realHistory, (item) => isShallowEqual(item.params, params));
  moveTo(to);
};

export const moveToPanel = (panel: string) => {
  moveToPartial({ panel });
};

export const moveToView = (view: string) => {
  moveToPartial({ view });
};

export const moveToPanelInView = (panel: string, view: string) => {
  moveToPartial({ panel, view });
};

export const moveToRoot = (root: string) => {
  moveToPartial({ root });
};

export const moveToId = (id: string) => {
  moveToPartial({ id });
};

export const moveByWithCallback = (by: number, callback: VoidFunction) => {
  if (canMoveBy(by)) {
    history.afterUpdate(callback);
  }
  moveBy(by);
};

export const moveToWithCallback = (to: number, callback: VoidFunction) => {
  if (canMoveTo(to)) {
    history.afterUpdate(callback);
  }
  moveTo(to);
};

export const moveToPartialWithCallback = (item: Partial<RealHistoryItem>, callback: VoidFunction) => {
  const to = findLastIndex(realHistory, (real) => isPartialEqual(item, real));
  moveToWithCallback(to, callback);
};
