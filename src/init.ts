import { __dev__, findLastIndex } from '@mntm/shared';

import { realHistory, setHistory } from './real.js';
import { popNative } from './native.js';

const popHandler = ({ state }: PopStateEvent) => {
  // prevent edge case
  state = Object(state);

  const to = findLastIndex(realHistory, (item) => item.id === state.id);
  if (to === -1) {
    if (__dev__) {
      console.warn('Something went wrong. History moved forward or changed from outside.');
      console.warn('Try to get back to normal.');
    }

    // prevent
    popNative();

    return;
  }

  // real
  setHistory(realHistory.slice(0, to + 1));

  // native noop
};

export const start = () => {
  window.addEventListener('popstate', popHandler);
};

export const stop = () => {
  window.removeEventListener('popstate', popHandler);
};
