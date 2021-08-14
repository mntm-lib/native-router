import type { RealHistoryItem } from './types.js';

import { updateHistory } from './history.js';

// Cannot be marked as readonly
export let realHistory: RealHistoryItem[] = [];

// Cannot be marked as readonly
export const setHistory = (newHistory: RealHistoryItem[]) => {
  realHistory = newHistory;
  updateHistory();
};

export const realIndex = () => realHistory.length - 1;

// Cannot be marked as readonly
export const realCurrent = () => realHistory[realIndex()];
