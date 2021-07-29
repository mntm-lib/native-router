import type { Optional } from '@mntm/shared';

import { useHandler, useMount, useUpdate, useCreation, findLast } from '@mntm/shared';

import { watchHistory, unwatchHistory } from './history.js';
import { realCurrent, realHistory } from './real.js';

const __dev__ = process.env.NODE_ENV === 'development';

// cannot be marked as readonly
export const useHistoryUpdate = () => {
  const update = useUpdate();

  useMount(() => {
    watchHistory(update);
    return () => unwatchHistory(update);
  });

  return realCurrent();
};

// store as global is safe and does not overcomplicate structure
let actionRef: Optional<Element> = null;
export const useCurrentActionRef = () => {
  if (__dev__) {
    if (!actionRef && realCurrent().params.popout) {
      console.warn('Popout is found without action ref.');
      console.warn('Make sure you are doing it right.');
    }
  }

  // handle mistypes?
  return actionRef as Element;
};
export const useActionRef = (handler: (el: Element) => void) => {
  const ref = useHandler((el: Optional<Element>) => {
    if (el) {
      actionRef = el;
    }
  });

  const action = useHandler(() => {
    if (__dev__) {
      if (!actionRef) {
        console.warn('Action is called without element.');
        console.warn('Make sure you are doing it right.');
      }
    }

    if (actionRef) {
      handler(actionRef);
    }
  });

  return [ref, action] as const;
};

// cannot be marked as readonly
export const useMemoCurrent = (assignPanel: string) => {
  return useCreation(() => {
    const current = findLast(realHistory, (item) => item.panel === assignPanel);
    if (__dev__) {
      if (!current) {
        console.warn('Passed panel is not found in history.');
        console.warn('Make sure you are doing it right.');
      }
    }
    return current || realCurrent();
  });
};

// cannot be marked as readonly
export const useMemoParams = (assignPanel: string) => {
  return useMemoCurrent(assignPanel).params;
};

// re-export all as hooks
export {
  swipeHistory as useSwipeHistory,

  memoPanel as useMemoPanel,
  memoView as useMemoView,

  paramsModal as useParamsModal,
  paramsPopout as useParamsPopout
} from './integration.js';
