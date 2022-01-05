import type { AnyFunction } from '@mntm/shared';
import type { NativeHistoryItem } from './types.js';

import { dom, noop } from '@mntm/shared';

const nativeHistory = (dom && window.history) || ({} as unknown as History);
const nativeScroll = 'scrollRestoration';

export const listenNative = (type: string, handler: AnyFunction) => {
  if (dom) {
    window.addEventListener(type, handler, false);

    return () => window.removeEventListener(type, handler, false);
  }

  return noop;
};

export const scrollNative = () => {
  if (nativeScroll in nativeHistory) {
    nativeHistory[nativeScroll] = 'manual';
  }
};

export const pushNative = (item: Readonly<NativeHistoryItem>) => {
  if (dom) {
    nativeHistory.pushState(item, document.title);
  }
};

export const replaceNative = (item: Readonly<NativeHistoryItem>) => {
  if (dom) {
    nativeHistory.replaceState(item, document.title);
  }
};

export const popNative = () => {
  if (dom) {
    nativeHistory.back();
  }
};

export const moveByNative = (by: number) => {
  if (dom) {
    nativeHistory.go(by);
  }
};

export const updateNative = () => {
  if (dom) {
    replaceNative(nativeHistory.state);
  }
};

export const lifecycleNative = () => {
  if (dom) {
    scrollNative();

    // Fix scroll
    listenNative('focus', scrollNative);

    // Fix state
    listenNative('blur', updateNative);
  }
};
