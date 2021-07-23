import { IRiftRoute, IRouter } from './IRiftRoute';

export class Router implements IRouter {
  private index = 0;
  private defaultRoute: any;
  public routes: any[] = [];
  public path: string;
  public params: any;
  public search: any;
  public active: any;
  public fallback: any;

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
  }

  register = () => this.index++;

  to(newPath = '/', fromHistory = false) {
    if (newPath !== this.path || fromHistory) {
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      if (!fromHistory) {
        try {
          window.history.pushState(null, null, this.path);
        } catch (e) {
          // code here..
        }
      }
    }
  }

  private updateActiveRoute() {
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

  private setActiveRoute(route, params = {}, search = {}) {
    this.active?.onLeave?.(this);
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

  public setRoutes(routes: IRiftRoute[], components = [], parent = '', hooks: any = {}) {
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
          this.defaultRoute = {
            path: '*',
            components: components.concat(component),
            ...hook,
          };
        } else {
          // Enforce: set clean 'path' url '//review' = '/review' - '////review//6' = '/review/6'
          aux.push({
            path: (parent + (path || '')).replace(/(\/)\1+/g, '/'),
            components: components.concat(component),
            ...hook,
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
    querystring.replace(pattern, (substring, $1, $2): any => {
      return (search = { ...search, ...{ [$1]: $2 } });
    });
    return search;
  }
}
