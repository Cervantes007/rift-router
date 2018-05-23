import * as React from 'react';
import { RiftRouter } from './RiftRouter';
import { inject } from 'mobx-react';

export const RiftLink = inject('router')(
  (props: {
    router?: RiftRouter;
    to: string;
    className?: string;
    onClick?: Function;
    children: any;
  }) => {
    const { router, to, onClick, className, children } = props;

    const click = e => {
      router.riftTo(to);
      typeof onClick === 'function' && onClick(e);
    };

    return (
      <span onClick={click} className={className}>
        {children}
      </span>
    );
  }
);
