import type { ComponentProps, ComponentType } from 'react';
import type { AnyFunction } from '@mntm/shared';

import { createElement, useMemo } from 'react';

import { useHistoryUpdate } from './hooks.js';
import { memoPanel, memoView, paramsModal, swipeHistory } from './integration.js';
import { pop, popOrClearModal } from './pop.js';

type ExtendProps<T extends ComponentType<any>, C extends T> = Omit<ComponentProps<C>, keyof ComponentProps<T>>;
type RouterProps = { nav: string };

type ComponentModal = ComponentType<{
  activeModal: string | null;
  onClose?: AnyFunction | undefined;
}>;
type ComponentModalProps<C extends ComponentModal> =
  ExtendProps<ComponentModal, C>;

type ComponentEpic = ComponentType<{
  activeStory: string;
}>;
type ComponentEpicProps<C extends ComponentEpic> =
  ExtendProps<ComponentEpic, C>;

type ComponentRoot = ComponentType<{
  activeView: string;
}>;
type ComponentRootProps<C extends ComponentRoot> =
  ExtendProps<ComponentRoot, C> & RouterProps;

type ComponentView = ComponentType<{
  activePanel: string;
  history?: string[] | undefined;
  onSwipeBack?: AnyFunction | undefined;
}>;
type ComponentViewProps<C extends ComponentView> =
  ExtendProps<ComponentView, C> & RouterProps;

type ComponentPanel = ComponentType<Record<never, never>>;
type ComponentPanelProps<C extends ComponentPanel> =
  ExtendProps<ComponentPanel, C> & RouterProps;

export const navModal = <C extends ComponentModal>(Component: C) => {
  return (props: ComponentModalProps<C>) => {
    const current = useHistoryUpdate();

    return useMemo(() => {
      return createElement(Component, Object.assign({
        activeModal: paramsModal(),
        onClose: popOrClearModal
      }, props));
    }, [current.params.modal]);
  };
};

export const navEpic = <C extends ComponentEpic>(Component: C) => {
  return (props: ComponentEpicProps<C>) => {
    const current = useHistoryUpdate();

    return useMemo(() => {
      return createElement(Component, Object.assign({
        activeStory: current.root
      }, props));
    }, [current.root]);
  };
};

export const navRoot = <C extends ComponentRoot>(Component: C) => {
  return (props: ComponentRootProps<C>) => {
    const current = useHistoryUpdate();

    return useMemo(() => {
      return createElement(Component, Object.assign({
        activeView: memoView(props.nav)
      }, props));
    }, [current.view]);
  };
};

export const navView = <C extends ComponentView>(Component: C) => {
  return (props: ComponentViewProps<C>) => {
    const current = useHistoryUpdate();

    return useMemo(() => {
      return createElement(Component, Object.assign({
        activePanel: memoPanel(props.nav),
        history: swipeHistory(),
        onSwipeBack: pop
      }, props));
    }, [current.panel]);
  };
};

export const navPanel = <C extends ComponentPanel>(Component: C) => {
  return (props: ComponentPanelProps<C>) => {
    const current = useHistoryUpdate();

    return useMemo(() => {
      return createElement(Component, props);
    }, [current.params]);
  };
};
