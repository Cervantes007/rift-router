import { IRiftRoute, IRouter } from './IRiftRoute';
export declare class Router implements IRouter {
  private index;
  private defaultRoute;
  routes: any[];
  path: string;
  params: any;
  search: any;
  active: any;
  fallback: any;
  constructor(myRoutes: IRiftRoute[], path?: string);
  register: () => number;
  to(newPath?: string, fromHistory?: boolean): void;
  private updateActiveRoute;
  private setActiveRoute;
  setRoutes(routes: IRiftRoute[], components?: any[], parent?: string, hooks?: any): any[];
  private checkMatch;
  private queryString;
}
