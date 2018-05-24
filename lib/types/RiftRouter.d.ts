import { IRiftRoute } from './IRiftRoute';
export declare class RiftRouter {
  routes: any[];
  private index;
  private defaultRoute;
  path: string;
  params: any;
  search: any;
  active: any;
  constructor(myRoutes: IRiftRoute[]);
  riftRouterBrowserSync(): void;
  register(): number;
  riftTo(newPath?: string): void;
  private updateActiveRoute();
  private setActiveRoute(route, params?, search?);
  private setRoutes(routes, components?, parent?, hooks?);
  private checkMatch(route, currentPath);
  private queryString(querystring);
}
