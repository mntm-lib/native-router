import { mitt } from '@mntm/shared';

export const historyEmitter = mitt();

export const subscribeHistory = (handle: VoidFunction) => {
  historyEmitter.on('update', handle);
};

export const unsubscribeHistory = (handle: VoidFunction) => {
  historyEmitter.off('update', handle);
};

export const afterUpdateHistory = (handle: VoidFunction) => {
  const once = () => {
    unsubscribeHistory(once);
    handle();
  };
  subscribeHistory(once);
};

export const updateHistory = () => {
  historyEmitter.emit('update');
};
