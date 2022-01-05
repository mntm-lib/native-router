import { findLastIndex, noop } from '@mntm/shared';

import { realCurrent, realHistory, realIndex, setHistory } from './real.js';
import { listenNative, popNative, pushNative } from './native.js';

const __dev__ = process.env.NODE_ENV === 'development';

let locked = false;
let free = noop;

export const lock = () => {
  locked = true;
};

export const unlock = () => {
  locked = false;
};

const popHandler = ({ state }: PopStateEvent) => {
  // Prevent edge case
  state = Object.assign({}, state);

  const to = findLastIndex(realHistory, (item) => item.id === state.id);

  if (to === -1) {
    if (__dev__) {
      console.warn('Something went wrong. History moved forward or changed from outside.');
      console.warn('Automatically trying to get back to normal.');
    }

    // Prevent
    popNative();

    return;
  }

  if (locked) {
    // Prevent
    pushNative({ id: realCurrent().id });
  } else {
    // Real
    setHistory(realHistory.slice(0, to + 1));

    // Native noop
  }
};

export const start = () => {
  if (__dev__ && realIndex() === -1) {
    console.warn('Router started without initialization.');
    console.warn('Make sure you are doing it right.');
  }

  free = listenNative('popstate', popHandler);
};

export const stop = () => {
  if (__dev__ && free !== noop) {
    console.warn('Router is stopped.');
    console.warn('Make sure you are doing it right.');
  }

  free();
  free = noop;
};
