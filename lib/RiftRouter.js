'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mobx_1 = require('mobx');
class RiftRouter {
  constructor(myRoutes) {
    this.routes = [];
    this.index = 0;
    this.path = location ? location.pathname : '/';
    this.routes = this.setRoutes([...myRoutes]);
    this.updateActiveRoute();
    if (window) {
      window.addEventListener('popstate', this.riftRouterBrowserSync.bind(this));
    }
  }
  riftRouterBrowserSync() {
    const path = location ? location.pathname : '/';
    this.riftTo(path);
  }
  register() {
    return this.index++;
  }
  riftTo(newPath, noUpdateBrowserHistory = true) {
    if (newPath !== this.path) {
      let onClient = noUpdateBrowserHistory;
      if (onClient === undefined) {
        onClient = !!(window && window.document);
      }
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      if (onClient && this.path !== window.location.pathname) {
        window.history.pushState(null, null, this.path);
      }
    }
  }
  updateActiveRoute() {
    let useDefuaut = true;
    for (const route of this.routes) {
      const aux = this.checkMatch(route, this.path);
      const { match, params, pattern } = aux;
      route.pattern = pattern;
      if (match) {
        this.active && this.active.onLeave && this.active.onLeave(this);
        if (route.onEnter) {
          const redirectTo = route.onEnter(this);
          if (typeof redirectTo === 'string') {
            this.riftTo(redirectTo);
            break;
          }
        }
        this.active = Object.assign({}, route);
        this.params = params;
        if (location) {
          this.search = this.queryString(location.search);
        }
        useDefuaut = false;
        break;
      }
    }
    if (useDefuaut && this.defaultRoute && this.defaultRoute.path === '*') {
      this.active = Object.assign({}, this.defaultRoute);
      this.params = {};
      if (location) {
        this.search = this.queryString(location.search);
      }
    }
  }
  setRoutes(routes, components = [], parent = '', hooks = {}) {
    let aux = [];
    for (const route of routes) {
      const { children, component, path, onEnter, onLeave } = route;
      if (children) {
        aux = aux.concat(
          this.setRoutes(children, components.concat(component), parent + path, {
            onEnter: hooks.onEnter ? hooks.onEnter : onEnter,
            onLeave: hooks.onLeave ? hooks.onLeave : onLeave,
          })
        );
      } else {
        if (path === '*') {
          this.defaultRoute = {
            path: '*',
            components: components.concat(component),
            onEnter: hooks.onEnter ? hooks.onEnter : onEnter,
            onLeave: hooks.onLeave ? hooks.onLeave : onLeave,
          };
        } else {
          aux.push({
            path: parent + (path || '/'),
            components: components.concat(component),
            onEnter: hooks.onEnter ? hooks.onEnter : onEnter,
            onLeave: hooks.onLeave ? hooks.onLeave : onLeave,
          });
        }
      }
    }
    return aux;
  }
  checkMatch(route, currentPath) {
    const { path = '/' } = route;
    let match = false;
    const pattern = new RegExp(path.replace(/:[\D][\w]+/g, ':?([\\w]+)'));
    const keys = pattern.exec(path);
    let params = {};
    if (keys) {
      const values = pattern.exec(currentPath);
      if (values && values.index === 0 && values[0] === values.input) {
        for (let i = 1; i < values.length; i++) {
          if (values[i] !== undefined) {
            params = Object.assign({}, params, { [keys[i]]: values[i] });
          }
        }
        match = true;
      }
    }
    return { params, pattern, match };
  }
  queryString(querystring) {
    const pattern = /\??([\w]+)=([\w]+)&?/g;
    let search = {};
    querystring.replace(pattern, (substring, $1, $2) => {
      return (search = Object.assign({}, search, { [$1]: $2 }));
    });
    return search;
  }
}
__decorate([mobx_1.observable], RiftRouter.prototype, 'path', void 0);
__decorate([mobx_1.observable], RiftRouter.prototype, 'params', void 0);
__decorate([mobx_1.observable], RiftRouter.prototype, 'search', void 0);
__decorate([mobx_1.observable], RiftRouter.prototype, 'active', void 0);
__decorate([mobx_1.action], RiftRouter.prototype, 'riftTo', null);
__decorate([mobx_1.action], RiftRouter.prototype, 'updateActiveRoute', null);
exports.RiftRouter = RiftRouter;
//# sourceMappingURL=RiftRouter.js.map
