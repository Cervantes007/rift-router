export declare class RiftRouter {
    routes: any[];
    private index;
    path: string;
    params: any;
    search: any;
    active: any;
    constructor(myRoutes: any);
    riftRouterBrowserSync(): void;
    register(): number;
    riftTo(newPath: string, noUpdateBrowserHistory?: boolean): void;
    private updateActiveRoute();
    private setRoutes(routes, components?, parent?, hooks?);
    private checkMatch(route, currentPath);
    private queryString(querystring);
}
