import React, { useContext } from 'react';
import { IRouter, RiftContext } from './RiftProvider';

export const RiftLink = (props: {
  to: string;
  className?: string;
  onClick?: (e) => void;
  children: any;
}) => {
  const { to, onClick, className, children } = props;
  const router = useContext<IRouter>(RiftContext);

  const click = e => {
    router.to(to);
    typeof onClick === 'function' && onClick(e);
  };

  return (
    <span onClick={click} className={className}>
      {children}
    </span>
  );
};
