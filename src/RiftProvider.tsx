import React, { createContext, memo, PropsWithChildren, useRef, useState } from 'react';
import { IRouter } from './IRiftRoute';
import { useInitRouter } from './useInitRouter';

const initialValue: IRouter | any = {};
export const RiftContext = createContext(initialValue);

type RiftProviderProps = PropsWithChildren<{
  routes: any;
  fallback?: any;
}>;

export const RiftProvider = memo(({ children, routes, fallback }: RiftProviderProps) => {
  useRef(
    window?.addEventListener('popstate', () => {
      const path = location ? `${location.pathname}${location.search}` : '/';
      to(path !== 'blank' ? path : '/', true);
    })
  );

  const router = useInitRouter(routes, fallback);
  const [state, setState] = useState<any>({ ...router });

  const updateState = () => setState({ ...router });

  const to = (path, fromHistory = false) => {
    if (router.path !== path) {
      router.to(path, fromHistory);
      updateState();
    }
  };

  const contextValue = { ...state, to };

  return <RiftContext.Provider value={contextValue}>{children}</RiftContext.Provider>;
});
