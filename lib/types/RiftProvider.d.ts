import React, { Component } from 'react';
export declare const RiftContext: React.Context<any>;
export declare class RiftProvider extends Component<{
  children: any;
  routes: any;
}> {
  constructor(props: any);
  updateState: () => void;
  to: (path: any, fromHistory?: boolean) => void;
  render(): JSX.Element;
}
