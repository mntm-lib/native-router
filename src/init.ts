import { findLastIndex } from './utils_deprecated.js';

import { realHistory, setHistory } from './real.js';

const popHandler = ({ state }: PopStateEvent) => {
  const to = findLastIndex(realHistory, (item) => item.id === state.id);
  if (to === -1) {
    // TODO: warn
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
