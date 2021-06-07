import { realHistory, realCurrent, realIndex } from './real.js';

export const swipeHistory = (): string[] => {
  const current = realCurrent();

  // has overlay
  if (current.params.modal || current.params.popout) {
    return [];
  }

  let i = realIndex() - 1;
  for (; i !== -1 && current.view === realHistory[i].view; --i) {
    if (current.panel !== realHistory[i].panel) {
      break;
    }
  }

  // nowhere to swipe
  if (i === -1) {
    return [];
  }

  const backPanel = realHistory[i].panel;
  const currentPanel = current.panel;

  // still same
  if (backPanel === currentPanel) {
    return [];
  }

  return [backPanel, currentPanel];
};

// WeakMap throws error in firefox, so just Map
// See: https://caniuse.com/mdn-javascript_builtins_weakmap_get
const memoizedViews = new Map();
export const memoView = (assignRoot: string, currentRoot: string): string => {
  const { view } = realCurrent();

  if (assignRoot === currentRoot) {
    memoizedViews.set(assignRoot, view);
    return view;
  }

  return memoizedViews.get(assignRoot) || view;
};

// WeakMap throws error in firefox, so just Map
// See: https://caniuse.com/mdn-javascript_builtins_weakmap_get
const memoizedPanels = new Map();
export const memoPanel = (assignView: string, currentView: string): string => {
  const { panel } = realCurrent();

  if (assignView === currentView) {
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
