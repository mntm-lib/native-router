import type { RealHistoryInit, RealHistoryItem } from './types.js';

import { __dev__, findLastIndex, weakUniqueId } from '@mntm/shared';

import { realCurrent, realHistory, realIndex, setHistory } from './real.js';
import { popNative, pushNative, replaceNative } from './native.js';

let locked = false;

export const lock = () => {
  locked = true;
};

export const unlock = () => {
  locked = false;
};

const popHandler = ({ state }: PopStateEvent) => {
  // prevent edge case
  state = Object(state);

  const to = findLastIndex(realHistory, (item) => item.id === state.id);
  if (to === -1) {
    if (__dev__) {
      console.warn('Something went wrong. History moved forward or changed from outside.');
      console.warn('Automatically trying to get back to normal.');
    }

    // prevent
    popNative();

    return;
  }

  if (locked) {
    // prevent
    pushNative({ id: realCurrent().id });
  } else {
    // real
    setHistory(realHistory.slice(0, to + 1));

    // native noop
  }
};

export const init = (item: Readonly<RealHistoryInit>) => {
  const first = item as RealHistoryItem;

  const id = weakUniqueId();

  // update item
  first.id = id;
  first.params = Object.assign({}, first.params);

  // real
  realHistory.push(first);
  setHistory(realHistory);

  // native
  replaceNative({ id });
};

export const start = () => {
  if (__dev__) {
    if (realIndex() === -1) {
      console.warn('Router started without initialization.');
      console.warn('Make sure you are doing it right.');
    }
  }

  window.addEventListener('popstate', popHandler);
};

export const stop = () => {
  if (__dev__) {
    console.warn('Router is stopped.');
    console.warn('Make sure you are doing it right.');
  }

  window.removeEventListener('popstate', popHandler);
};
