import { action, observable } from 'mobx';
import { IRiftRoute } from './IRiftRoute';

export class RiftRouter {
  public routes: any[] = [];
  private index: number = 0;
  private defaultRoute: any;
  @observable public path: string;
  @observable public params: any;
  @observable public search: any;
  @observable public active: any;

  constructor(myRoutes: IRiftRoute[]) {
    this.path = location ? `${location.pathname}${location.search}${location.hash}` : '/';
    this.routes = this.setRoutes([...myRoutes]);
    this.updateActiveRoute();
    if (window) {
      window.addEventListener('popstate', this.riftRouterBrowserSync.bind(this));
    }
  }

  riftRouterBrowserSync() {
    const path = location ? `${location.pathname}${location.search}${location.hash}` : '/';
    this.riftTo(path !== 'blank' ? path : '/');
  }

  register() {
    return this.index++;
  }

  @action
  riftTo(newPath: string = '/') {
    if (!new RegExp(/^\//).test(newPath)) {
      throw new SyntaxError(`The given url must start with /`);
    }
    if (newPath !== this.path) {
      this.path = newPath;
      this.index = 0;
      this.updateActiveRoute();
      new RegExp(/^\//).test(location.pathname) && window.history.pushState(null, null, this.path);
    }
  }

  @action
  private updateActiveRoute() {
    let useDefuaut = true;
    const aux = this.path.split('?');
    const path = aux[0];
    let search = {};
    if (aux.length === 2) {
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
        this.riftTo(redirectTo);
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
