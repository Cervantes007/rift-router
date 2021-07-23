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
exports.RiftProvider = exports.RiftContext = void 0;
const react_1 = __importStar(require('react'));
const useInitRouter_1 = require('./useInitRouter');
const initialValue = {};
exports.RiftContext = react_1.createContext(initialValue);
exports.RiftProvider = react_1.memo(({ children, routes, fallback }) => {
  react_1.useRef(
    window === null || window === void 0
      ? void 0
      : window.addEventListener('popstate', () => {
          const path = location ? `${location.pathname}${location.search}` : '/';
          to(path !== 'blank' ? path : '/', true);
        })
  );
  const router = useInitRouter_1.useInitRouter(routes, fallback);
  const [state, setState] = react_1.useState(Object.assign({}, router));
  const updateState = () => setState(Object.assign({}, router));
  const to = (path, fromHistory = false) => {
    if (router.path !== path) {
      router.to(path, fromHistory);
      updateState();
    }
  };
  const contextValue = Object.assign(Object.assign({}, state), { to });
  return react_1.default.createElement(exports.RiftContext.Provider, { value: contextValue }, children);
});
//# sourceMappingURL=RiftProvider.js.map
