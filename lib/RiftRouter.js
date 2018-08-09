'use strict';
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
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
var mobx_1 = require('mobx');
var RiftRouter = /** @class */ (function() {
  function RiftRouter(myRoutes, path) {
    this.routes = [];
    this.index = 0;
    this.routes = this.setRoutes(myRoutes.slice());
    if (path) {
      this.path = path;
    } else {
      try {
        this.path = location ? '' + location.pathname + location.search : '/';
      } catch (e) {
        if (e.message !== 'location is not defined') {
          // console.log(e);
        }
      }
    }
    this.updateActiveRoute();
    try {
      window && window.addEventListener('popstate', this.riftRouterBrowserSync.bind(this));
    } catch (e) {
      if (e.message !== 'window is not defined') {
        // console.log(e);
      }
    }
  }
  RiftRouter.prototype.riftRouterBrowserSync = function() {
    var path = location ? '' + location.pathname + location.search : '/';
    this.riftTo(path !== 'blank' ? path : '/');
  };
  RiftRouter.prototype.register = function() {
    return this.index++;
  };
  RiftRouter.prototype.riftTo = function(newPath) {
    if (newPath === void 0) {
      newPath = '/';
    }
    if (!new RegExp(/^\//).test(newPath)) {
      throw new SyntaxError('The given url must start with /');
    }
    if (newPath !== this.path) {
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      try {
        new RegExp(/^\//).test(location.pathname) &&
          window.history.pushState(null, null, this.path);
      } catch (e) {
        if (e.message !== 'window is not defined' && e.message !== 'location is not defined') {
          // console.log(e);
        }
      }
    }
  };
  RiftRouter.prototype.updateActiveRoute = function() {
    var useDefuaut = true;
    var aux = this.path.split('?');
    var path = aux[0];
    var search = {};
    if (aux.length === 2 && aux[1]) {
      var _a = aux[1].split('#'),
        searchAux = _a[0],
        hash = _a[1];
      search = aux.length === 2 ? this.queryString('?' + searchAux) : {};
    }
    for (var _i = 0, _b = this.routes; _i < _b.length; _i++) {
      var route = _b[_i];
      var _c = this.checkMatch(route, path),
        match = _c.match,
        params = _c.params,
        pattern = _c.pattern;
      route.pattern = pattern;
      if (match) {
        this.setActiveRoute(route, params, search);
        useDefuaut = false;
        break;
      }
    }
    if (useDefuaut && this.defaultRoute && this.defaultRoute.path === '*') {
      this.setActiveRoute(this.defaultRoute);
    }
  };
  RiftRouter.prototype.setActiveRoute = function(route, params, search) {
    if (params === void 0) {
      params = {};
    }
    if (search === void 0) {
      search = {};
    }
    this.active && this.active.onLeave && this.active.onLeave(this);
    if (route.onEnter) {
      var redirectTo = route.onEnter(this);
      if (typeof redirectTo === 'string') {
        this.riftTo(redirectTo);
        return;
      }
    }
    this.active = __assign({}, route);
    this.params = params;
    this.search = search;
  };
  RiftRouter.prototype.setRoutes = function(routes, components, parent, hooks) {
    if (components === void 0) {
      components = [];
    }
    if (parent === void 0) {
      parent = '';
    }
    if (hooks === void 0) {
      hooks = {};
    }
    var aux = [];
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
      var route = routes_1[_i];
      var children = route.children,
        component = route.component,
        path = route.path,
        onEnter = route.onEnter,
        onLeave = route.onLeave;
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
  };
  RiftRouter.prototype.checkMatch = function(route, currentPath) {
    var _a = route.path,
      path = _a === void 0 ? '/' : _a;
    var match = false;
    var pattern = route.pattern || new RegExp(path.replace(/:[\D][\w]+/g, ':?([\\w]+)'));
    var keys = pattern.exec(path);
    var params = {};
    if (keys) {
      var values = pattern.exec(currentPath);
      if (values && values.index === 0 && values[0] === values.input) {
        for (var i = 1; i < values.length; i++) {
          if (values[i] !== undefined) {
            params = __assign({}, params, ((_b = {}), (_b[keys[i]] = values[i]), _b));
          }
        }
        match = true;
      }
    }
    return { params: params, pattern: pattern, match: match };
    var _b;
  };
  RiftRouter.prototype.queryString = function(querystring) {
    var pattern = /\??([\w]+)=([\w]+)&?/g;
    var search = {};
    querystring.replace(pattern, function(substring, $1, $2) {
      return (search = __assign({}, search, ((_a = {}), (_a[$1] = $2), _a)));
      var _a;
    });
    return search;
  };
  __decorate([mobx_1.observable], RiftRouter.prototype, 'path', void 0);
  __decorate([mobx_1.observable], RiftRouter.prototype, 'params', void 0);
  __decorate([mobx_1.observable], RiftRouter.prototype, 'search', void 0);
  __decorate([mobx_1.observable], RiftRouter.prototype, 'active', void 0);
  __decorate([mobx_1.action], RiftRouter.prototype, 'riftTo', null);
  __decorate([mobx_1.action], RiftRouter.prototype, 'updateActiveRoute', null);
  return RiftRouter;
})();
exports.RiftRouter = RiftRouter;
//# sourceMappingURL=RiftRouter.js.map
