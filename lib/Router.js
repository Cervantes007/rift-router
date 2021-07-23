'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Router = void 0;
class Router {
  constructor(myRoutes, path) {
    this.index = 0;
    this.routes = [];
    this.register = () => this.index++;
    this.routes = this.setRoutes([...myRoutes]);
    if (path) {
      this.path = path;
    } else {
      try {
        this.path = location ? `${location.pathname}${location.search}` : '/';
      } catch (e) {}
    }
    this.updateActiveRoute();
  }
  setPath(path) {
    this.path = path;
  }
  to(newPath = '/', fromHistory = false) {
    if (newPath !== this.path || fromHistory) {
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      if (!fromHistory) {
        try {
          window.history.pushState(null, null, this.path);
        } catch (e) {}
      }
    }
  }
  updateActiveRoute() {
    let useDefault = true;
    const aux = this.path.split('?');
    const path = aux[0];
    let search = {};
    if (aux.length === 2 && aux[1]) {
      const [searchAux, hash] = aux[1].split('#');
      search = aux.length === 2 ? this.queryString(`?${searchAux}`) : {};
    }
    for (const route of this.routes) {
      const { match, params, pattern } = this.checkMatch(route, path);
      route.pattern = pattern;
      if (match) {
        this.setActiveRoute(route, params, search);
        useDefault = false;
        break;
      }
    }
    if (useDefault && this.defaultRoute && this.defaultRoute.path === '*') {
      this.setActiveRoute(this.defaultRoute);
    }
  }
  setActiveRoute(route, params = {}, search = {}) {
    var _a, _b;
    (_b = (_a = this.active) === null || _a === void 0 ? void 0 : _a.onLeave) === null ||
    _b === void 0
      ? void 0
      : _b.call(_a, this);
    if (route.onEnter) {
      const redirectTo = route.onEnter(this);
      if (typeof redirectTo === 'string') {
        this.to(redirectTo);
        return;
      }
    }
    this.active = Object.assign({}, route);
    this.params = params;
    this.search = search;
  }
  setRoutes(routes, components = [], parent = '', hooks = {}) {
    let aux = [];
    for (const route of routes) {
      const { children, component, path, onEnter, onLeave } = route;
      const hook = {
        onEnter: hooks.onEnter ? hooks.onEnter : onEnter,
        onLeave: hooks.onLeave ? hooks.onLeave : onLeave,
      };
      if (children) {
        aux = aux.concat(
          this.setRoutes(children, components.concat(component), parent + path, hook)
        );
      } else {
        if (path === '*') {
          this.defaultRoute = Object.assign(
            { path: '*', components: components.concat(component) },
            hook
          );
        } else {
          aux.push(
            Object.assign(
              {
                path: (parent + (path || '')).replace(/(\/)\1+/g, '/'),
                components: components.concat(component),
              },
              hook
            )
          );
        }
      }
    }
    return aux;
  }
  checkMatch(route, currentPath) {
    const { path = '/' } = route;
    let match = false;
    const pattern = route.pattern || new RegExp(path.replace(/:[\D][\w]+/g, ':?([\\w]+)'));
    const keys = pattern.exec(path);
    let params = {};
    if (keys) {
      const values = pattern.exec(currentPath);
      if (values && values.index === 0 && values[0] === values.input) {
        for (let i = 1; i < values.length; i++) {
          if (values[i] !== undefined) {
            params = Object.assign(Object.assign({}, params), { [keys[i]]: values[i] });
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
      return (search = Object.assign(Object.assign({}, search), { [$1]: $2 }));
    });
    return search;
  }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map
