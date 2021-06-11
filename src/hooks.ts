import type { Optional } from '@mntm/shared';

import { __dev__, useHandler, useMount, useUpdate } from '@mntm/shared';

import { history } from './history.js';
import { realCurrent } from './real.js';

export const useHistoryUpdate = () => {
  const update = useUpdate();

  useMount(() => {
    history.subscribe(update);
    return () => history.unsubscribe(update);
  });

  return realCurrent();
};

// store as global is safe and does not overcomplicate structure
let actionRef: Optional<Element> = null;
export const useCurrentActionRef = () => {
  if (__dev__) {
    if (!actionRef && realCurrent().params.popout) {
      console.warn('Found popup without action ref.');
      console.warn('Make sure you are doing it right.');
    }
  }

  // handle mistypes?
  return actionRef as unknown as Element;
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
        console.warn('Action called without element.');
        console.warn('Make sure you are doing it right.');
      }
    }

    if (actionRef) {
      handler(actionRef);
    }
  });

  return [ref, action] as const;
};

// re-export all as hooks
export {
  swipeHistory as useSwipeHistory,

  memoPanel as useMemoPanel,
  memoView as useMemoView,

  paramsModal as useParamsModal,
  paramsPopout as useParamsPopout
} from './integration.js';
