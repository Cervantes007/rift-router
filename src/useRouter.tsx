import { useContext } from 'react';
import { IRouter } from './IRiftRoute';
import { RiftContext } from './RiftProvider';

export function useRouter() {
  return useContext<IRouter>(RiftContext);
}
