'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          }
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RiftGate = void 0;
const react_1 = __importStar(require('react'));
const RiftProvider_1 = require('./RiftProvider');
const RiftGate = ({ fallback }) => {
  const router = react_1.useContext(RiftProvider_1.RiftContext);
  const { active } = router;
  const render = react_1.useMemo(() => {
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
        { fallback: fallback || router.fallback || react_1.default.createElement('div', null, 'Loading...') },
        react_1.default.createElement(Component, null)
      );
    }
    return typeof component === 'function' ? component({ router }) : component;
  }, [active]);
  return react_1.default.createElement(react_1.default.Fragment, null, render);
};
exports.RiftGate = RiftGate;
//# sourceMappingURL=RiftGate.js.map
