import { IRiftRoute, IRouter } from './IRiftRoute';

export class Router implements IRouter {
  private index: number = 0;
  private defaultRoute: any;
  public routes: any[] = [];
  public path: string;
  public params: any;
  public search: any;
  public active: any;

  constructor(myRoutes: IRiftRoute[], path?: string) {
    this.routes = this.setRoutes([...myRoutes]);
    if (path) {
      this.path = path;
    } else {
      try {
        this.path = location ? `${location.pathname}${location.search}` : '/';
      } catch (e) {
        // if (e.message !== 'location is not defined') {
        //   // console.log(e);
        // }
      }
    }

    this.updateActiveRoute();
    try {
      window && window.addEventListener('popstate', this.riftRouterBrowserSync.bind(this));
    } catch (e) {
      // if (e.message !== 'window is not defined') {
      //   // console.log(e);
      // }
    }
  }

  riftRouterBrowserSync() {
    const path = location ? `${location.pathname}${location.search}` : '/';
    this.to(path !== 'blank' ? path : '/');
  }

  register = () => {
    return this.index++;
  };

  to(newPath: string = '/') {
    if (!new RegExp(/^\//).test(newPath)) {
      throw new SyntaxError(`The given url must start with /`);
    }
    if (newPath !== this.path) {
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      try {
        new RegExp(/^\//).test(location.pathname) &&
          window.history.pushState(null, null, this.path);
      } catch (e) {
        // if (e.message !== 'window is not defined' && e.message !== 'location is not defined') {
        //   // console.log(e);
        // }
      }
    }
  }

  private updateActiveRoute() {
    let useDefuaut = true;
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
        useDefuaut = false;
        break;
      }
    }
    if (useDefuaut && this.defaultRoute && this.defaultRoute.path === '*') {
      this.setActiveRoute(this.defaultRoute);
    }
  }

  private setActiveRoute(route, params = {}, search = {}) {
    this.active && this.active.onLeave && this.active.onLeave(this);
    if (route.onEnter) {
      const redirectTo = route.onEnter(this);
      if (typeof redirectTo === 'string') {
        this.to(redirectTo);
        return;
      }
    }
    this.active = { ...route };
    this.params = params;
    this.search = search;
  }

  private setRoutes(routes: IRiftRoute[], components = [], parent = '', hooks: any = {}) {
    let aux = [];
    for (const route of routes) {
      const { children, component, path: routePath, onEnter, onLeave } = route;
      // User Validation: allow use 'home' without '/' at first character at any route level (able on children to)
      const path = routePath.startsWith('/') || routePath === '*' ? routePath : `/${routePath}`;
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
          // Enforce: set clean 'path' url '//review' = '/review' - '////review//6' = '/review/6'
          aux.push({
            path: (parent + (path || '/')).replace(/(\/)\1+/g, '/'),
            components: components.concat(component),
            onEnter: hooks.onEnter ? hooks.onEnter : onEnter,
            onLeave: hooks.onLeave ? hooks.onLeave : onLeave,
          });
        }
      }
    }
    return aux;
  }

  private checkMatch(route: any, currentPath) {
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
            params = { ...params, ...{ [keys[i]]: values[i] } };
          }
        }
        match = true;
      }
    }
    return { params, pattern, match };
  }

  private queryString(querystring: string) {
    const pattern = /\??([\w]+)=([\w]+)&?/g;
    let search = {};
    querystring.replace(
      pattern,
      (substring, $1, $2): any => {
        return (search = { ...search, ...{ [$1]: $2 } });
      }
    );
    return search;
  }
}
