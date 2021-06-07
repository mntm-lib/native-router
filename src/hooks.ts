import { useMount, useUpdate } from '@mntm/shared';
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

// re-export all as hooks
export {
  swipeHistory as useSwipeHistory,

  memoPanel as useMemoPanel,
  memoView as useMemoView,

  paramsModal as useParamsModal,
  paramsPopout as useParamsPopout
} from './integration.js';
