import React, { useState } from 'react';
import { Router } from './Router';
export interface IRouter {
  params?: any;
  active?: any;
  search?: any;
  path?: string;
  to?: (path: string) => void;
  register?: () => number;
}
const initialValue: IRouter = {};
export const RiftContext = React.createContext(initialValue);

export const RiftProvider = ({ children, routes }) => {
  const router = new Router(routes);

  const buildState = () => {
    const { params, active, search, path } = router;
    return { params, active, search, path };
  };

  const [state, setState]: any = useState(buildState());

  const to = path => {
    router.riftTo(path);
    setState(buildState());
  };

  return (
    <RiftContext.Provider value={{ ...state, to, register: router.register }}>
      {children}
    </RiftContext.Provider>
  );
};
