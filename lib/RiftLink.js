'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function() {
            return m[k];
          },
        });
      }
    : function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function(o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function(o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RiftLink = void 0;
const react_1 = __importStar(require('react'));
const RiftProvider_1 = require('./RiftProvider');
const RiftLink = ({ to, onClick: click, className, children }) => {
  const router = react_1.useContext(RiftProvider_1.RiftContext);
  const onClick = e => {
    if (router.path !== to) {
      router.to(to);
      click === null || click === void 0 ? void 0 : click(e);
    }
  };
  return react_1.default.createElement('span', Object.assign({}, { onClick, className }), children);
};
exports.RiftLink = RiftLink;
//# sourceMappingURL=RiftLink.js.map
