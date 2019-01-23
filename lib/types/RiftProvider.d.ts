import React from 'react';
export interface IRouter {
    params?: any;
    active?: any;
    search?: any;
    path?: string;
    to?: (path: string) => void;
    register?: () => number;
}
export declare const RiftContext: React.Context<IRouter>;
export declare const RiftProvider: ({ children, routes }: {
    children: any;
    routes: any;
}) => JSX.Element;
