import { Router } from './Router';

export interface IRouter {
  path: string;
  params: any;
  search: any;
  active: any;
  fallback: any;
  to: (path: string) => void;
}

export interface IRiftRoute {
  path: string;
  component?: any;
  children?: IRiftRoute[];
  onEnter?: (router?: Router) => null | string | void;
  onLeave?: (router?: Router) => void;
}
