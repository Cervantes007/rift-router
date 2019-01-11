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
exports.RiftLink = props => {
  const { to, onClick, className, children } = props;
  const router = react_1.useContext(RiftProvider_1.RiftContext);
  const click = e => {
    router.to(to);
    typeof onClick === 'function' && onClick(e);
  };
  return react_1.default.createElement('span', { onClick: click, className: className }, children);
};
//# sourceMappingURL=RiftLink.js.map
