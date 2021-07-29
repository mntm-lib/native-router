import type { RealHistoryParams, RealHistoryPartial } from './types.js';

import { findLastIndex, isShallowEqual, isPartialEqual } from '@mntm/shared';

import { realHistory, realIndex, setHistory } from './real.js';
import { moveByNative } from './native.js';
import { afterUpdateHistory } from './history.js';

const __dev__ = process.env.NODE_ENV === 'development';

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
  moveByNative(by);
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

export const moveToPartial = (item: Readonly<RealHistoryPartial>) => {
  const to = findLastIndex(realHistory, (real) => isPartialEqual(item, real));
  moveTo(to);
};

export const moveToParams = (params: Readonly<RealHistoryParams>) => {
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
