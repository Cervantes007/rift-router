import * as React from 'react';
import { RiftRouter } from './RiftRouter';
import { inject, observer } from 'mobx-react';

export const RiftGate = inject('router')(
  observer((props: { router?: RiftRouter }) => {
    const { router } = props;
    const index: number = router.register();
    return <React.Fragment>{router.active.components[index](props)}</React.Fragment>;
  })
);
