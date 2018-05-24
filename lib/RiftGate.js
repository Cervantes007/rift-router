'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var mobx_react_1 = require('mobx-react');
exports.RiftGate = mobx_react_1.inject('router')(
  mobx_react_1.observer(function(props) {
    var router = props.router;
    var index = router.register();
    return React.createElement(React.Fragment, null, router.active.components[index](props));
  })
);
//# sourceMappingURL=RiftGate.js.map
