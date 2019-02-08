import React, { useContext, useMemo } from 'react';
import { IRouter } from './IRiftRoute';
import { RiftContext } from './RiftProvider';

export const RiftGate = () => {
  const router = useContext<IRouter>(RiftContext);
  const { active } = router;
  const render = useMemo(
    () => {
      const index = (router as any).register();
      const message = `RiftGate nested level: ${index}. Please check your routes`;
      if (!active) {
        console.error(message);
        return null;
      }
      const component = active.components[index];
      if (!component) {
        console.error(message);
        return null;
      }
      return typeof component === 'function' ? component({ router }) : component;
    },
    [active]
  );
  return <React.Fragment>{render}</React.Fragment>;
};
