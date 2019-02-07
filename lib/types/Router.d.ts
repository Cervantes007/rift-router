import { IRiftRoute, IRouter } from './IRiftRoute';
export declare class Router implements IRouter {
  private index;
  private defaultRoute;
  routes: any[];
  path: string;
  params: any;
  search: any;
  active: any;
  constructor(myRoutes: IRiftRoute[], path?: string);
  riftRouterBrowserSync(): void;
  register: () => number;
  to(newPath?: string): void;
  private updateActiveRoute;
  private setActiveRoute;
  private setRoutes;
  private checkMatch;
  private queryString;
}
