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
exports.RiftGate = () => {
  const router = react_1.useContext(RiftProvider_1.RiftContext);
  const index = router.register();
  const component = router.active.components[index];
  if (!component) {
    console.error(
      `RiftGate nested level: ${index} not will render component. Please check your routes`
    );
    return null;
  }
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    typeof component === 'function' ? component({ router }) : component
  );
};
//# sourceMappingURL=RiftGate.js.map
