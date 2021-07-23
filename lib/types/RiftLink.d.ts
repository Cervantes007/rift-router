import { ReactNode } from 'react';
declare type Props = {
  to: string;
  className?: string;
  onClick?: (e: any) => void;
  children: ReactNode | ReactNode[];
};
export declare const RiftLink: ({ to, onClick: click, className, children }: Props) => JSX.Element;
export {};
