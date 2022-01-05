import { realCurrent, realHistory, realIndex } from './real.js';

// Cannot be marked as readonly
export const swipeHistory = (): string[] => {
  const currentIndex = realIndex();

  // Nowhere to swipe
  if (currentIndex < 1) {
    return [];
  }

  const current = realHistory[currentIndex];

  // Has overlay
  if (current.params.modal || current.params.popout) {
    return [];
  }

  const back = realHistory[currentIndex - 1];

  // Nowhere to swipe
  if (
    back.root !== current.root ||
    back.view !== current.view ||
    back.panel === current.panel
  ) {
    return [];
  }

  return [back.panel, current.panel];
};

const memoizedViews = new Map<string, string>();

export const memoView = (assignRoot: string): string => {
  const { view, root } = realCurrent();

  if (assignRoot === root) {
    memoizedViews.set(assignRoot, view);

    return view;
  }

  return memoizedViews.get(assignRoot) || view;
};

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
