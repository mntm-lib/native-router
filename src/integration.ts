import { realHistory, realIndex, realCurrent } from './real.js';

// cannot be marked as readonly
export const swipeHistory = (): string[] => {
  const index = realIndex();

  // nowhere to swipe
  if (index < 1) {
    return [];
  }

  const current = realHistory[index];

  // has overlay
  if (current.params.modal || current.params.popout) {
    return [];
  }

  let i = index - 1;
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
