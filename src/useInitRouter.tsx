import { useLayoutEffect, useRef, useState } from 'react';
import { Router } from './Router';

export function useInitRouter(routes: any, fallback: any) {
  const ref = useRef(routes);
  const [router, setRouter] = useState(new Router(ref.current));
  router.fallback = fallback || null;
  useLayoutEffect(() => {
    if (routes !== ref) {
      ref.current = routes;
      setRouter(new Router(routes));
    }
  }, [routes]);
  return router;
}
