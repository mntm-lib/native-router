import { mitt } from '@mntm/shared';

export const historyEmitter = mitt();

export const watchHistory = (handle: VoidFunction) => {
  historyEmitter.on('update', handle);
};

export const unwatchHistory = (handle: VoidFunction) => {
  historyEmitter.off('update', handle);
};

export const afterUpdateHistory = (handle: VoidFunction) => {
  const once = () => {
    unwatchHistory(once);
    handle();
  };
  watchHistory(once);
};

export const updateHistory = () => {
  historyEmitter.emit('update');
};
