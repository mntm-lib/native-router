import type { RealHistoryItem } from './types.js';

import { realCurrent, realIndex, realHistory, setHistory } from './real.js';

import { replaceNative } from './native.js';

export const replace = (item: RealHistoryItem) => {
  const id = realCurrent().id;

  // update item
  item.id = id;
  item.params = Object.assign({}, item.params);

  // real
  realHistory[realIndex()] = item;
  setHistory(realHistory);

  // native
  replaceNative({ id });
};

export const replacePartial = (item: Partial<RealHistoryItem>) => {
  replace(Object.assign({}, realCurrent(), item));
};

export const replacePanel = (panel: string) => {
  replacePartial({ panel });
};

export const replaceView = (panel: string, view: string) => {
  replacePartial({ panel, view });
};

export const replaceParams = (params: RealHistoryItem['params']) => {
  replacePartial({ params });
};

export const replacePartialParams = (params: RealHistoryItem['params']) => {
  const current = realCurrent();
  replaceParams(Object.assign({}, current.params, params));
};

export const replaceClearParams = () => {
  replaceParams({});
};

export const replaceClearParamsExceptOverlay = () => {
  const current = realCurrent();
  replaceParams({
    modal: current.params.modal,
    popout: current.params.popout
  });
};

export const replaceClearParamsExceptModal = () => {
  const current = realCurrent();
  replaceParams({
    modal: current.params.modal
  });
};

export const replaceClearParamsExceptPopout = () => {
  const current = realCurrent();
  replaceParams({
    popout: current.params.popout
  });
};
