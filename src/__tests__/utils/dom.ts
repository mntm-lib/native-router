import { JSDOM } from 'jsdom';

const init = new JSDOM();
const self = global as unknown as Record<string, any>;

// common
self.window = init.window;
self.document = init.window.document;
self.location = init.window.location;
self.history = init.window.history;
self.navigator = init.window.navigator;

// custom
self.requestAnimationFrame = init.window.requestAnimationFrame;
self.HTMLInputElement = init.window.HTMLInputElement;

// disable history queue
Object.defineProperty(self.window._sessionHistory, '_queueHistoryTraversalTask', {
  value: (fn: () => void) => fn()
});

// low-level clear history
const initHistoryEntry = Object.assign({}, self.window._sessionHistory._entries[0]);
export const clearHistory = () => {
  self.window._sessionHistory._currentIndex = 0;
  self.window._sessionHistory._entries = [initHistoryEntry];
};
