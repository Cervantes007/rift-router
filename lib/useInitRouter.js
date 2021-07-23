'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useInitRouter = void 0;
const react_1 = require('react');
const Router_1 = require('./Router');
function useInitRouter(routes, fallback) {
  const ref = react_1.useRef(routes);
  const [router, setRouter] = react_1.useState(new Router_1.Router(ref.current));
  router.fallback = fallback || null;
  react_1.useLayoutEffect(() => {
    if (routes !== ref) {
      ref.current = routes;
      setRouter(new Router_1.Router(routes));
    }
  }, [routes]);
  return router;
}
exports.useInitRouter = useInitRouter;
//# sourceMappingURL=useInitRouter.js.map
