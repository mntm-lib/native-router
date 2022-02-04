import type { RealHistoryItem, RealHistoryParams } from './types.js';

import { fastUniqueId, parseHashParams, stringifyParams } from '@mntm/shared';

import { watchHistory } from './history.js';
import { realCurrent } from './real.js';

const EMPTY = '';
const SEPARATOR = '/';

export const DEFAULT = 'default';

// Fastest stringify
export const buildLocation = (item: Readonly<RealHistoryItem>) => {
  let location = EMPTY;

  if (item.root !== DEFAULT) {
    location += SEPARATOR + item.root;
  }

  if (item.view !== DEFAULT) {
    location += SEPARATOR + item.view;
  }

  if (item.panel !== DEFAULT) {
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

// Fastest parse params
export const parseLocationParams = (locationParams: string | URLSearchParams) => {
  return parseHashParams(locationParams.toString()) as RealHistoryParams;
};

// Fastest parse
export const parseLocation = (location: string | URL) => {
  const split = location.toString().split('?');

  const structure = split[0].split(SEPARATOR);

  const panel = structure.pop() || DEFAULT;
  const view = structure.pop() || DEFAULT;
  const root = structure.pop() || DEFAULT;

  const params = split.length === 2 ? parseLocationParams(split[1]) : {};

  const item: RealHistoryItem = {
    id: fastUniqueId(),

    panel,
    view,
    root,

    params
  };

  return item;
};

export const setLocationHandler = (handler: (location: string) => void) => {
  watchHistory(() => {
    handler(buildLocation(realCurrent()));
  });
};
