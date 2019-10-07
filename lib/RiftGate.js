'use strict';
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result['default'] = mod;
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const RiftProvider_1 = require('./RiftProvider');
exports.RiftGate = ({ fallback }) => {
  const router = react_1.useContext(RiftProvider_1.RiftContext);
  const { active } = router;
  const render = react_1.useMemo(
    () => {
      const index = router.register();
      const message = `RiftGate nested level: ${index}. Please check your routes`;
      if (!active) {
        console.error(message);
        return null;
      }
      const component = active.components[index];
      if (!component) {
        if (active.components.length > index) {
          return react_1.default.createElement(exports.RiftGate, null);
        }
        console.error(message);
        return null;
      }
      if (component.$$typeof && component.$$typeof.toString() === 'Symbol(react.lazy)') {
        const Component = component;
        return react_1.default.createElement(
          react_1.Suspense,
          {
            fallback:
              fallback ||
              router.fallback ||
              react_1.default.createElement('div', null, 'Loading...'),
          },
          react_1.default.createElement(Component, null)
        );
      }
      return typeof component === 'function' ? component({ router }) : component;
    },
    [active]
  );
  return react_1.default.createElement(react_1.default.Fragment, null, render);
};
//# sourceMappingURL=RiftGate.js.map
