import {
  Epic,
  Panel,
  Root,
  View,
  ModalRoot
} from '@vkontakte/vkui';

import {
  navEpic,
  navModal,
  navPanel,
  navRoot,
  navView,
} from '@mntm/native-router';

export const RouterModal = navModal(ModalRoot);
export const RouterEpic = navEpic(Epic);
export const RouterRoot = navRoot(Root);
export const RouterView = navView(View);
export const RouterPanel = navPanel(Panel);
