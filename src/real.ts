import type { RealHistoryItem } from './types.js';

import { updateHistory } from './history.js';

// cannot be marked as readonly
export let realHistory: RealHistoryItem[] = [];

// cannot be marked as readonly
export const setHistory = (newHistory: RealHistoryItem[]) => {
  realHistory = newHistory;
  updateHistory();
};

export const realIndex = () => realHistory.length - 1;

// cannot be marked as readonly
export const realCurrent = () => realHistory[realIndex()];
