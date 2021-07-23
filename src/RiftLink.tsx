import React, { ReactNode, useContext } from 'react';
import { IRouter } from './IRiftRoute';
import { RiftContext } from './RiftProvider';

type Props = {
  to: string;
  className?: string;
  onClick?: (e) => void;
  children: ReactNode | ReactNode[];
};

export const RiftLink = ({ to, onClick: click, className, children }: Props) => {
  const router = useContext<IRouter>(RiftContext);

  const onClick = e => {
    if (router.path !== to) {
      router.to(to);
      click?.(e);
    }
  };

  return <span {...{ onClick, className }}>{children}</span>;
};
