'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const React = require('react');
const mobx_react_1 = require('mobx-react');
exports.RiftLink = mobx_react_1.inject('router')(props => {
  const { router, to, onClick, className, children } = props;
  const click = e => {
    router.riftTo(to);
    typeof onClick === 'function' && onClick(e);
  };
  return React.createElement('span', { onClick: click, className: className }, children);
});
//# sourceMappingURL=RiftLink.js.map
