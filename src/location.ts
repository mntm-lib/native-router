import type { RealHistoryItem } from './types.js';

import { fastUniqueId, stringifyParams } from '@mntm/shared';

import { watchHistory } from './history.js';
import { realCurrent } from './real.js';

const EMPTY = '';
const DEFAULT = [EMPTY, 'home', 'main', 'index'];
const SEPARATOR = '/';

// Fastest stringify
export const buildLocation = (item: Readonly<RealHistoryItem>) => {
  let location = EMPTY;

  if (
    !DEFAULT.includes(item.root)
  ) {
    location += SEPARATOR + item.root;
  }

  if (
    !DEFAULT.includes(item.view) &&
    item.view !== item.root
  ) {
    location += SEPARATOR + item.view;
  }

  if (
    !DEFAULT.includes(item.panel) &&
    item.panel !== item.view
  ) {
    location += SEPARATOR + item.panel;
  }

  if (location === EMPTY) {
    location = SEPARATOR;
  }

  const params = stringifyParams(item.params);

  if (params === EMPTY) {
    return location;
  }

  return `${location}?${params}`;
};

// Fastest parse
export const parseLocation = (location: string) => {
  const split = location.split('?');

  const structure = split[0].split(SEPARATOR);

  const root = structure.pop() || EMPTY;
  const view = structure.pop() || root;
  const panel = structure.pop() || view;

  const item: RealHistoryItem = {
    id: fastUniqueId(),

    panel,
    view,
    root,

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
