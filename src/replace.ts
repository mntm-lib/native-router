import type { RealHistoryItem, RealHistoryParams, RealHistoryPartial } from './types.js';

import { realCurrent, realHistory, realIndex, setHistory } from './real.js';

import { replaceNative } from './native.js';

import { parseLocation, parseLocationParams } from './location.js';

export const replace = (item: Readonly<RealHistoryItem>) => {
  const next = item as RealHistoryItem;

  const id = realCurrent().id;

  // Update item
  next.id = id;
  next.params = Object.assign({}, item.params);

  // Real
  realHistory[realIndex()] = next;
  setHistory(realHistory);

  // Native
  replaceNative({ id });
};

export const replacePartial = (item: Readonly<RealHistoryPartial>) => {
  replace(Object.assign({}, realCurrent(), item));
};

export const replacePanel = (panel: string) => {
  replacePartial({ panel });
};

export const replaceView = (panel: string, view: string) => {
  replacePartial({ panel, view });
};

export const replaceParams = (params: Readonly<RealHistoryParams>) => {
  replacePartial({ params });
};

export const replacePartialParams = (params: Readonly<RealHistoryParams>) => {
  const current = realCurrent();

  replaceParams(Object.assign({}, current.params, params));
};

export const replaceClearParams = () => {
  replaceParams({});
};

export const replaceModal = (modal: string) => {
  replacePartialParams({ modal });
};

export const replacePopout = (popout: string) => {
  replacePartialParams({ popout });
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

export const replaceLocation = (location: string | URL) => {
  replace(parseLocation(location));
};

export const replaceLocationParams = (locationParams: string | URLSearchParams) => {
  replaceParams(parseLocationParams(locationParams));
};

export const replacePartialLocationParams = (locationParams: string | URLSearchParams) => {
  replacePartialParams(parseLocationParams(locationParams));
};
