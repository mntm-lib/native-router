import type { NativeHistoryItem } from './types.js';

const nativeHistory = window.history;

// title is not supported but required
// so just empty string
const NATIVE_STUB = '';

export const pushNative = (item: Readonly<NativeHistoryItem>) => {
  nativeHistory.pushState(item, NATIVE_STUB);
};

export const replaceNative = (item: Readonly<NativeHistoryItem>) => {
  nativeHistory.replaceState(item, NATIVE_STUB);
};

export const popNative = () => {
  nativeHistory.back();
};

export const goNative = (delta: number) => {
  nativeHistory.go(delta);
};

export const moveNative = (by: number) => {
  nativeHistory.go(-1 * by);
};
