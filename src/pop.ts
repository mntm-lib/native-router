import { realCurrent } from 'real.js';
import { popNative } from './native.js';

export const pop = popNative;

export const popOverlay = () => {
  const current = realCurrent();
  if (current.params.modal || current.params.popout) {
    pop();
  }
};

export const popModal = () => {
  const current = realCurrent();
  if (current.params.modal) {
    pop();
  }
};

export const popPopout = () => {
  const current = realCurrent();
  if (current.params.popout) {
    pop();
  }
};
