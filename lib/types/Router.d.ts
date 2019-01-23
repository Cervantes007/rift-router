import { IRiftRoute } from './IRiftRoute';
export declare class Router {
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
    riftTo(newPath?: string): void;
    private updateActiveRoute;
    private setActiveRoute;
    private setRoutes;
    private checkMatch;
    private queryString;
}
