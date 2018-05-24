'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var mobx_react_1 = require('mobx-react');
exports.RiftLink = mobx_react_1.inject('router')(function(props) {
  var router = props.router,
    to = props.to,
    onClick = props.onClick,
    className = props.className,
    children = props.children;
  var click = function(e) {
    router.riftTo(to);
    typeof onClick === 'function' && onClick(e);
  };
  return React.createElement('span', { onClick: click, className: className }, children);
});
//# sourceMappingURL=RiftLink.js.map
