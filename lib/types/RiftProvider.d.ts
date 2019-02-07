import React from 'react';
import { IRouter } from './IRiftRoute';
export declare const RiftContext: React.Context<IRouter>;
export declare const RiftProvider: (
  {
    children,
    routes,
  }: {
    children: any;
    routes: any;
  }
) => JSX.Element;
