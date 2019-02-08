import React, { useMemo, useState } from 'react';
import { Router } from './Router';
import { IRouter } from './IRiftRoute';

const initialValue: IRouter = new Router([]);
export const RiftContext = React.createContext(initialValue);

export const RiftProvider = ({ children, routes }) => {
  const router = new Router(routes);

  const buildState = () => {
    const { params, active, search, path } = router;
    return { params, active, search, path };
  };

  const [state, setState]: any = useState(buildState());

  const to = path => {
    if (router.path !== path) {
      router.to(path);
      setState(buildState());
    }
  };

  const contextValue = useMemo(() => ({ ...state, to, register: router.register }), [state]);

  return <RiftContext.Provider value={contextValue}>{children}</RiftContext.Provider>;
};
