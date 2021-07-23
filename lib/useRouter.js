'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.useRouter = void 0;
const react_1 = require('react');
const RiftProvider_1 = require('./RiftProvider');
function useRouter() {
  return react_1.useContext(RiftProvider_1.RiftContext);
}
exports.useRouter = useRouter;
//# sourceMappingURL=useRouter.js.map
