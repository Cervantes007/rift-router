# rift-router ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/rift-router.svg?branch=master)](https://travis-ci.org/Cervantes007/rift-router) [![codecov](https://codecov.io/gh/Cervantes007/rift-router/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/rift-router)

Blazing Fast and Lightweight router for React and Mobx - Fully Reactive Router based on state first.

## Features
* Lightweight 2kb (min/gzip).
* Blazing Fast update app state first and then Browser Sync.
* Reactive `params`, `search`, `path` and `active` router properties declare as mobx @observable.
* Typescript first class.
* Nesting Route.
* Hooks `onEnter` and `onLeave`.
* Redirect.
* Route Guard.
* Automatic Browser Sync
* Isomorphic.

## Installation

`npm install rift-router --save`

## Usage

```typescript
    import * as React from 'react';
    import * as ReactDOM from 'react-dom';
    import { Provider } from 'mobx-react';
    import { RiftGate, RiftLink, RiftRouter, IRiftRoute } from 'rift-router';

    const Home = () => <div>'Home Component'</div>;
    const About = () => <div>'About Component'</div>;

    const routes: IRiftRoute[] = [
      { path: '/', component: () => <Home/>},
      { path: '/about', component: () => <About/>},
    ];

    const router = new RiftRouter(routes);
    const stores = {router};

    ReactDOM.render(
      <Provider {...stores}>
        <div>
          <RiftLink to="/">Home</RiftLink> // navigate to Home Component
          <RiftLink to="/about">About</RiftLink> // navigate to About Component

          <RiftGate/> // render the component for active route.
        </div>
      </Provider>,
      document.getElementById('root')
    );
```

#### and that it, try it.

`RiftRouter` create a router instance with the routes receive in the constructor and then it's pass to `Provider`
as store to be use deep in the component tree.
 `RiftRouter` API:
 * `path` (show current path)
 * `params` (for path = `/contacts/:id` - current route = 'contacts/5' - router.params = {id: 5})
 * `search` (for route = `/contacts?from=home` router.search = {from: "home"})
The above porperties are mobx @observable you can use it in mobx reactions for your components.

`RiftGate` works as a gateway to show the correct component for the active route. If you have nesting routes you must
use the same number of `RiftGate` to render the nested components in the active route.

`RiftLink` have a `to` property that receive a string value with the route you want navigate to.
`RiftLink` API:
* `to` (string value to navigate if the user click the component)

Note: `We assume you have configure your environment, rift-router is build to work with react and mobx`

# How to use router object

1. In your route inject the router instance as a component prop
```typescript
    const routes = [
      { path: '/', component: (router) => <Home {...router}/>},
      { path: '/about', component: () => <About/>},
    ];
```

2. In your component use the router prop to redirect
```typescript
    const Home = ({router: RiftRouter}) => {
      const riftToAbout = () => router.riftTo('/about');
      return (
        <div>
          <div>Home Component</div>
          <button onClick={riftToAbout}>About us</button>
        </div>
      )
    };
```

## Or just inject the router with `inject` of mobx-react, for class component use @inject decorator .
```typescript
    const Home = inject('router')(({router: RiftRouter}) => {
      const riftToAbout = () => router.riftTo('/about');
      return (
        <div>
          <div>Home Component</div>
          <button onClick={riftToAbout}>About us</button>
        </div>
      )
    });
```

And more...