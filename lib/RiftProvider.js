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
const initialValue = {};
exports.RiftContext = react_1.default.createContext(initialValue);
let router;
class RiftProvider extends react_1.Component {
  constructor(props) {
    super(props);
    this.updateState = () => {
      const { params, active, search, path } = router;
      this.setState({ params, active, search, path });
    };
    this.to = (path, fromHistory = false) => {
      if (router.path !== path) {
        router.to(path, fromHistory);
        this.updateState();
      }
    };
    router = new Router_1.Router(props.routes);
    router.fallback = props.fallback || null;
    const { params, active, search, path, fallback } = router;
    this.state = { params, active, search, path, fallback };
    try {
      window &&
        window.addEventListener('popstate', () => {
          const path = location ? `${location.pathname}${location.search}` : '/';
          this.to(path !== 'blank' ? path : '/', true);
        });
    } catch (e) {}
  }
  render() {
    const contextValue = Object.assign({}, this.state, { to: this.to, register: router.register });
    return react_1.default.createElement(
      exports.RiftContext.Provider,
      { value: contextValue },
      this.props.children
    );
  }
}
exports.RiftProvider = RiftProvider;
//# sourceMappingURL=RiftProvider.js.map
