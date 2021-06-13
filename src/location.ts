import type { RealHistoryItem } from './types.js';

import { isOptional } from '@mntm/shared';

import { watchHistory } from './history.js';
import { realCurrent } from './real.js';

const EMPTY = '';
const SEPARATOR = '/';

// fastest stringify
export const buildLocation = (item: Readonly<RealHistoryItem>) => {
  let location = EMPTY;

  if (item.root !== EMPTY) {
    location += SEPARATOR + item.root;
  }

  if (item.view !== EMPTY) {
    location += SEPARATOR + item.view;
  }

  if (item.panel !== EMPTY) {
    location += SEPARATOR + item.panel;
  }

  if (location === EMPTY) {
    location = SEPARATOR;
  }

  let params = EMPTY;
  const raw = item.params;
  for (const key in raw) {
    const value = raw[key];
    if (!isOptional(value)) {
      params += key + '=' + value;
    }
  }

  if (params === EMPTY) {
    return location;
  }

  return location + '?' + params;
};

export const setLocationHandler = (handler: (location: string) => void) => {
  watchHistory(() => {
    handler(buildLocation(realCurrent()));
  });
};
