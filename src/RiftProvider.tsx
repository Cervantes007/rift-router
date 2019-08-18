import React, { Component } from 'react';
import { Router } from './Router';
import { IRouter } from './IRiftRoute';

const initialValue: IRouter | any = {};
export const RiftContext = React.createContext(initialValue);
let router: Router;

export class RiftProvider extends Component<{ children: any; routes: any }> {
  constructor(props) {
    super(props);
    router = new Router(props.routes);
    const { params, active, search, path } = router;
    this.state = { params, active, search, path };

    try {
      window &&
        window.addEventListener('popstate', () => {
          const path = location ? `${location.pathname}${location.search}` : '/';
          this.to(path !== 'blank' ? path : '/', true);
        });
    } catch (e) {
      // if (e.message !== 'window is not defined') {
      //   // console.log(e);
      // }
    }
  }

  updateState = () => {
    const { params, active, search, path } = router;
    this.setState({ params, active, search, path });
  };

  to = (path, fromHistory = false) => {
    if (router.path !== path) {
      router.to(path, fromHistory);
      this.updateState();
    }
  };

  render() {
    const contextValue = { ...this.state, to: this.to, register: router.register };
    return <RiftContext.Provider value={contextValue}>{this.props.children}</RiftContext.Provider>;
  }
}
