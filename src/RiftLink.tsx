import React, { useContext } from 'react';
import { IRouter } from './IRiftRoute';
import { RiftContext } from './RiftProvider';

export const RiftLink = (props: {
  to: string;
  className?: string;
  onClick?: (e) => void;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const { to, onClick, className, children } = props;
  const router = useContext<IRouter>(RiftContext);

  const click = e => {
    if (router.path !== to) {
      router.to(to);
      typeof onClick === 'function' && onClick(e);
    }
  };

  return (
    <span onClick={click} className={className}>
      {children}
    </span>
  );
};
