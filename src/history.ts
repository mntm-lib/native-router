import type { RealHistoryItem } from './types.js';

import { default as mitt } from 'mitt';
import { batch } from '@mntm/shared';

import { realCurrent } from './real.js';

const UPDATE = 'update';

type HistoryEvents = {
  [UPDATE]: RealHistoryItem;
};

type HistoryHandler = (current: RealHistoryItem) => void;

export const historyEmitter = mitt<HistoryEvents>();

export const unwatchHistory = (handle: HistoryHandler) => {
  historyEmitter.off(UPDATE, handle);
};

export const watchHistory = (handle: HistoryHandler) => {
  historyEmitter.on(UPDATE, handle);

  return () => unwatchHistory(handle);
};

export const afterUpdateHistory = (handle: HistoryHandler) => {
  const once = (current: RealHistoryItem) => {
    unwatchHistory(once);
    handle(current);
  };

  watchHistory(once);
};

export const updateHistory = () => {
  batch(() => {
    historyEmitter.emit(UPDATE, realCurrent());
  });
};
