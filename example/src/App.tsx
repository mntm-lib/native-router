import type { FC } from 'react';

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitCol,
  SplitLayout,
  Button,
  Div,
  ModalPage
} from '@vkontakte/vkui';

import {
  pop,
  pushModal,
  pushPanel,
  pushPartial,
  realCurrent
} from '@mntm/native-router';

import {
  RouterEpic,
  RouterModal,
  RouterPanel,
  RouterRoot,
  RouterView
} from './components';

import {
  modals,
  panels,
  roots,
  views
} from './route';

const Structure: FC = () => {
  return (
    <pre><code>{JSON.stringify(realCurrent(), null, 2)}</code></pre>
  );
};

export const App: FC = () => {
  return (
    <ConfigProvider transitionMotionEnabled={true}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            modal={(
              <RouterModal>
                <ModalPage nav={modals.TEST}>
                  <Structure />
                </ModalPage>
              </RouterModal>
            )}
          >
            <SplitCol width="100%" animate={true}>
              <RouterEpic>
                <RouterRoot nav={roots.HOME}>
                  <RouterView nav={views.HOME}>
                    <RouterPanel nav={panels.HOME}>
                      <Structure />
                      <Div>
                        <Button onClick={() => pushPanel(panels.INFO)}>
                          to panel {panels.INFO}
                        </Button>
                      </Div>
                      <Div>
                        <Button onClick={() => pushPartial({
                          view: views.SUPPORT,
                          panel: panels.SUPPORT
                        })}>
                          to panel {panels.SUPPORT}
                        </Button>
                      </Div>
                    </RouterPanel>
                    <RouterPanel nav={panels.INFO}>
                      <Structure />
                      <Div>
                        <Button onClick={() => pop()}>
                          back
                        </Button>
                      </Div>
                      <Div>
                        <Button onClick={() => pushPartial({
                          view: views.SUPPORT,
                          panel: panels.SUPPORT
                        })}>
                          to panel {panels.SUPPORT}
                        </Button>
                      </Div>
                    </RouterPanel>
                  </RouterView>
                  <RouterView nav={views.SUPPORT}>
                    <RouterPanel nav={panels.SUPPORT}>
                      <Structure />
                      <Div>
                        <Button onClick={() => pop()}>
                          back
                        </Button>
                      </Div>
                      <Div>
                        <Button onClick={() => pushModal(modals.TEST)}>
                          modal {modals.TEST}
                        </Button>
                      </Div>
                    </RouterPanel>
                  </RouterView>
                </RouterRoot>
              </RouterEpic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
