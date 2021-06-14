import type { RealHistoryItem } from './types.js';

import { isOptional, weakUniqueId } from '@mntm/shared';

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

// fastest parse
export const parseLocation = (location: string) => {
  const split = location.split('?');

  const structure = split[0].split(SEPARATOR);

  const item: RealHistoryItem = {
    id: weakUniqueId(),

    panel: structure.pop() || EMPTY,
    view: structure.pop() || EMPTY,
    root: structure.pop() || EMPTY,

    params: {}
  };

  if (split.length === 2) {
    const pairs = split[1].split('&');

    for (const pair of pairs) {
      const parsed = pair.split('=');
      item.params[parsed[0]] = parsed[1] || EMPTY;
    }
  }

  return item;
};

export const setLocationHandler = (handler: (location: string) => void) => {
  watchHistory(() => {
    handler(buildLocation(realCurrent()));
  });
};
