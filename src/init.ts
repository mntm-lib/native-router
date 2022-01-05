import type { RealHistoryInit, RealHistoryItem } from './types.js';

import { fastUniqueId } from '@mntm/shared';

import { realHistory, setHistory } from './real.js';
import { lifecycleNative, replaceNative } from './native.js';

export const init = (item: Readonly<RealHistoryInit>) => {
  const first = item as RealHistoryItem;

  const id = fastUniqueId();

  // Update item
  first.id = id;
  first.params = Object.assign({}, first.params);

  // Real
  realHistory.push(first);
  setHistory(realHistory);

  // Native
  lifecycleNative();
  replaceNative({ id });
};
