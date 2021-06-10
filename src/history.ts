import { mitt } from '@mntm/shared';

export const rawHistory = mitt();
export const history = {
  afterUpdate(handle: VoidFunction) {
    const once = () => {
      history.unsubscribe(once);
      handle();
    };
    history.subscribe(once);
  },
  subscribe(handle: VoidFunction) {
    rawHistory.on('update', handle);
  },
  unsubscribe(handle: VoidFunction) {
    rawHistory.off('update', handle);
  },
  update() {
    rawHistory.emit('update');
  }
};
