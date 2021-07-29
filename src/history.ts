import { default as mitt } from 'mitt';

export const historyEmitter = mitt();

const EVENT = 'update';

export const watchHistory = (handle: VoidFunction) => {
  historyEmitter.on(EVENT, handle);
};

export const unwatchHistory = (handle: VoidFunction) => {
  historyEmitter.off(EVENT, handle);
};

export const afterUpdateHistory = (handle: VoidFunction) => {
  const once = () => {
    unwatchHistory(once);
    handle();
  };
  watchHistory(once);
};

export const updateHistory = () => {
  historyEmitter.emit(EVENT);
};
