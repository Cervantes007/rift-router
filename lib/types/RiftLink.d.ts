import React from 'react';
export declare const RiftLink: (
  props: {
    to: string;
    className?: string;
    onClick?: (e: any) => void;
    children:
      | string
      | number
      | boolean
      | {}
      | React.ReactElement<any>
      | React.ReactNodeArray
      | React.ReactPortal
      | React.ReactNode[];
  }
) => JSX.Element;
