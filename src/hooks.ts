import type { Optional } from '@mntm/shared';

import { findLast, useCreation, useHandler, useMount, useUpdate } from '@mntm/shared';

import { unwatchHistory, watchHistory } from './history.js';
import { realCurrent, realHistory } from './real.js';

const __dev__ = process.env.NODE_ENV === 'development';

// Cannot be marked as readonly
export const useHistoryUpdate = () => {
  const update = useUpdate();

  useMount(() => {
    watchHistory(update);

    return () => unwatchHistory(update);
  });

  return realCurrent();
};

// Store as global is safe and does not overcomplicate structure
let actionRef: Optional<Element> = null;

export const useCurrentActionRef = () => {
  if (__dev__ && !actionRef && realCurrent().params.popout) {
    console.warn('Popout is found without action ref.');
    console.warn('Make sure you are doing it right.');
  }

  // Handle mistypes?
  return actionRef!;
};
export const useActionRef = (handler: (el: Element) => void) => {
  const ref = useHandler((el: Optional<Element>) => {
    if (el) {
      actionRef = el;
    }
  });

  const action = useHandler(() => {
    if (__dev__ && !actionRef) {
      console.warn('Action is called without element.');
      console.warn('Make sure you are doing it right.');
    }

    if (actionRef) {
      handler(actionRef);
    }
  });

  return [ref, action] as const;
};

// Cannot be marked as readonly
export const useMemoCurrent = (assignPanel: string) => {
  return useCreation(() => {
    const current = findLast(realHistory, (item) => item.panel === assignPanel);

    if (__dev__ && !current) {
      console.warn('Passed panel is not found in history.');
      console.warn('Make sure you are doing it right.');
    }

    return current || realCurrent();
  });
};

// Cannot be marked as readonly
export const useMemoParams = (assignPanel: string) => {
  return useMemoCurrent(assignPanel).params;
};

// Re-export all as hooks
export {
  swipeHistory as useSwipeHistory,

  memoPanel as useMemoPanel,
  memoView as useMemoView,

  paramsModal as useParamsModal,
  paramsPopout as useParamsPopout
} from './integration.js';
