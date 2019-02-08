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
const Router_1 = require('./Router');
const initialValue = new Router_1.Router([]);
exports.RiftContext = react_1.default.createContext(initialValue);
exports.RiftProvider = ({ children, routes }) => {
  const router = new Router_1.Router(routes);
  const buildState = () => {
    const { params, active, search, path } = router;
    return { params, active, search, path };
  };
  const [state, setState] = react_1.useState(buildState());
  const to = path => {
    if (router.path !== path) {
      router.to(path);
      setState(buildState());
    }
  };
  const contextValue = react_1.useMemo(
    () => Object.assign({}, state, { to, register: router.register }),
    [state]
  );
  return react_1.default.createElement(
    exports.RiftContext.Provider,
    { value: contextValue },
    children
  );
};
//# sourceMappingURL=RiftProvider.js.map
