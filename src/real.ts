import type { RealHistoryItem } from './types.js';

import { updateHistory } from './history.js';

export let realHistory: RealHistoryItem[] = [];

export const setHistory = (newHistory: RealHistoryItem[]) => {
  realHistory = newHistory;
  updateHistory();
};

export const realIndex = () => realHistory.length - 1;
export const realCurrent = () => realHistory[realIndex()];
