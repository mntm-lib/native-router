import type { RealHistoryItem } from './types.js';

import { findLastIndex, isShallowEqual } from '@mntm/shared';

import { realHistory, realIndex, setHistory } from './real.js';
import { moveNative } from './native.js';

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
  if (canMoveBy(by)) {
    moveByUnsafe(by);
  }
};

export const moveTo = (to: number) => {
  if (canMoveTo(to)) {
    moveToUnsafe(to);
  }
};

export const moveToParams = (params: RealHistoryItem['params']) => {
  const to = findLastIndex(realHistory, (item) => isShallowEqual(item.params, params));
  moveTo(to);
};

export const moveToPanel = (panel: string) => {
  const to = findLastIndex(realHistory, (item) => item.panel === panel);
  moveTo(to);
};

export const moveToView = (view: string) => {
  const to = findLastIndex(realHistory, (item) => item.view === view);
  moveTo(to);
};

export const moveToPanelInView = (panel: string, view: string) => {
  const to = findLastIndex(realHistory, (item) => item.panel === panel && item.view === view);
  moveTo(to);
};

export const moveToRoot = (root: string) => {
  const to = findLastIndex(realHistory, (item) => item.root === root);
  moveTo(to);
};

export const moveToId = (id: string) => {
  const to = findLastIndex(realHistory, (item) => item.id === id);
  moveTo(to);
};
