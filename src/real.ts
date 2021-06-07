import type { RealHistoryItem } from './types.js';

import { history } from './history.js';

export let realHistory: RealHistoryItem[] = [];

export const setHistory = (newHistory: RealHistoryItem[]) => {
  realHistory = newHistory;
  history.update();
};

export const realIndex = () => realHistory.length - 1;
export const realCurrent = () => realHistory[realIndex()];
