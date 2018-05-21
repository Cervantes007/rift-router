"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
exports.RiftGate = mobx_react_1.inject('router')(mobx_react_1.observer((props) => {
    const { router } = props;
    const index = router.register();
    return React.createElement(React.Fragment, null, router.active.components[index](props));
}));
//# sourceMappingURL=RiftGate.js.map