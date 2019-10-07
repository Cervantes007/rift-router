import React, { useContext, useMemo, Suspense } from 'react';
import { IRouter } from './IRiftRoute';
import { RiftContext } from './RiftProvider';

interface IRiftGate {
  fallback?: any;
}

export const RiftGate = ({ fallback }: IRiftGate) => {
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
        if (active.components.length > index) {
          return <RiftGate />;
        }
        console.error(message);
        return null;
      }
      if (component.$$typeof && component.$$typeof.toString() === 'Symbol(react.lazy)') {
        const Component = component;
        return (
          <Suspense fallback={fallback || router.fallback || <div>Loading...</div>}>
            <Component />
          </Suspense>
        );
      }
      return typeof component === 'function' ? component({ router }) : component;
    },
    [active]
  );
  return <React.Fragment>{render}</React.Fragment>;
};
