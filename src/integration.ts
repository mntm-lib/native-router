import { realHistory, realIndex, realCurrent } from './real.js';

// cannot be marked as readonly
export const swipeHistory = (): string[] => {
  const currentIndex = realIndex();

  // nowhere to swipe
  if (currentIndex < 1) {
    return [];
  }

  const current = realHistory[currentIndex];

  // has overlay
  if (current.params.modal || current.params.popout) {
    return [];
  }

  const back = realHistory[currentIndex - 1];

  // nowhere to swipe
  if (
    back.root !== current.root ||
    back.view !== current.view
  ) {
    return [];
  }

  return [back.panel, current.panel];
};

// WeakMap throws error in firefox, so just Map
// See: https://caniuse.com/mdn-javascript_builtins_weakmap_get
const memoizedViews = new Map<string, string>();
export const memoView = (assignRoot: string): string => {
  const { view, root } = realCurrent();

  if (assignRoot === root) {
    memoizedViews.set(assignRoot, view);
    return view;
  }

  return memoizedViews.get(assignRoot) || view;
};

// WeakMap throws error in firefox, so just Map
// See: https://caniuse.com/mdn-javascript_builtins_weakmap_get
const memoizedPanels = new Map<string, string>();
export const memoPanel = (assignView: string): string => {
  const { panel, view } = realCurrent();

  if (assignView === view) {
    memoizedPanels.set(assignView, panel);
    return panel;
  }

  return memoizedPanels.get(assignView) || panel;
};

export const paramsModal = (): string | null => {
  return realCurrent().params.modal || null;
};

export const paramsPopout = (): string | null => {
  return realCurrent().params.popout || null;
};
