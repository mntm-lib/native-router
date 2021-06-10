import type { RealHistoryItem } from './types.js';

import { __dev__, isEmptyArray } from '@mntm/shared';

import { realCurrent, realHistory } from './real.js';
import { popNative } from './native.js';
import { replace, replacePartial, replacePanel, replaceView, replacePartialParams, replaceParams } from './replace.js';

export const canPop = () => {
  return !isEmptyArray(realHistory);
};

export const popUnsafe = popNative;

export const pop = () => {
  if (__dev__) {
    if (!canPop()) {
      console.warn('Nowhere to pop.');
      console.warn('Make sure you are doing it right.');
    }
  }

  if (canPop()) {
    popUnsafe();
  }
};

export const popIfCan = (): boolean => {
  const can = canPop();
  if (can) {
    popUnsafe();
  }
  return !can;
};

export const popOverlay = () => {
  const current = realCurrent();
  if (current.params.modal || current.params.popout) {
    pop();
  }
};

export const popModal = () => {
  const current = realCurrent();
  if (current.params.modal) {
    pop();
  }
};

export const popPopout = () => {
  const current = realCurrent();
  if (current.params.popout) {
    pop();
  }
};

export const popOrReplace = (item: RealHistoryItem) => {
  if (popIfCan()) {
    replace(item);
  }
};

export const popOrReplacePartial = (item: Partial<RealHistoryItem>) => {
  if (popIfCan()) {
    replacePartial(item);
  }
};

export const popOrReplacePanel = (panel: string) => {
  if (popIfCan()) {
    replacePanel(panel);
  }
};

export const popOrReplaceView = (panel: string, view: string) => {
  if (popIfCan()) {
    replaceView(panel, view);
  }
};

export const popOrClearOverlay = () => {
  const current = realCurrent();
  if (current.params.modal || current.params.popout) {
    if (popIfCan()) {
      replacePartialParams({ modal: null, popout: null });
    }
  }
};

export const popOrClearModal = () => {
  const current = realCurrent();
  if (current.params.modal) {
    if (popIfCan()) {
      replacePartialParams({ modal: null });
    }
  }
};

export const popOrClearPopout = () => {
  const current = realCurrent();
  if (current.params.popout) {
    if (popIfCan()) {
      replacePartialParams({ popout: null });
    }
  }
};

export const popOrReplacePartialParams = (params: RealHistoryItem['params']) => {
  if (popIfCan()) {
    replacePartialParams(params);
  }
};

export const popOrReplaceParams = (params: RealHistoryItem['params']) => {
  if (popIfCan()) {
    replaceParams(params);
  }
};

export const popOrClearParams = () => {
  popOrReplaceParams({});
};
