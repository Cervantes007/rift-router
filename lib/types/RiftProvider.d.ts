import React, { PropsWithChildren } from 'react';
export declare const RiftContext: React.Context<any>;
declare type RiftProviderProps = PropsWithChildren<{
  routes: any;
  fallback?: any;
}>;
export declare const RiftProvider: React.MemoExoticComponent<({
  children,
  routes,
  fallback,
}: RiftProviderProps) => JSX.Element>;
export {};
