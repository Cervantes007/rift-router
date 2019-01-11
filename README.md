# rift-router ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/rift-router.svg?branch=master)](https://travis-ci.org/Cervantes007/rift-router) [![codecov](https://codecov.io/gh/Cervantes007/rift-router/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/rift-router)

Waiting for React Hooks, please use v0.2.7 with mobx and mobx-react until hooks will be released.

Blazing Fast and Lightweight router for React Based on state first..

## Features

- Lightweight 1.6kb (min/gzip) - 4.3kb (min)
- No Dependencies
- Blazing Fast update app state first and then Browser Sync.
- Useful route information in `params`, `search`, `path` and `active` router properties.
- Typescript first class.
- Nesting Route.
- Hooks `onEnter` and `onLeave`.
- Redirect.
- Route Guard.
- Automatic Browser Sync
- Isomorphic.

## Installation

`npm install rift-router --save`

## Usage

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { IRiftRoute, RiftProvider, RiftGate, RiftLink } from 'rift-router';

const Home = () => <div>'Home Component'</div>;
const About = () => <div>'About Component'</div>;

const routes: IRiftRoute[] = [
  { path: '/', component: <Home /> },
  { path: '/about', component: () => <About /> },
];

ReactDOM.render(
  <RiftProvider routes={routes}>
    <RiftLink to="/">Home</RiftLink> {/* navigate to Home component */}
    <RiftLink to="/about">About</RiftLink> {/* navigate to About component */}
    <RiftGate /> {/* render the component for current route */}
  </RiftProvider>,
  document.getElementById('root')
);
```

Check basic usage in a sandbox:

[![Edit RiftRouter Basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/myq5nowwwp)

#### and that's it, try it.

`RiftRouter` create a router instance and share it using `React.Context` to be use deep in the component tree using
`useContext` hook.

`RiftRouter` API:

- `path` (show current path)
- `params` (for path = `/contacts/:id` - current route = 'contacts/5' -> `router.params` = `{id: 5}`)
- `search` (for route = `/contacts?from=home` -> `router.search` = `{from: "home"}`)

`RiftGate` works as a gateway to show the correct component for the active route. If you have nesting routes you must
use the same number of `RiftGate` to render the nested components in the active route.

`RiftLink` API:

- `to` (string value to navigate on click event)

Note: `We assume you have configure your environment, rift-router is build to work with react hooks`

## How to use router object

1.  In your component use the router from RiftContext using useContext built-in hook.

```typescript
const Home = () => {
  const router = useContext(RiftContext);
  const toAbout = () => router.to('/about');
  return (
    <div>
      <div>Home Component</div>
      <button onClick={toAbout}>About us</button>
    </div>
  );
};
```

2.  In your route inject the router instance as a component prop

```typescript
const routes: IRiftRoute[] = [
  { path: '/', component: <Home /> },
  { path: '/about', component: router => <About router={router} /> },
];
```

TODO:

- Add documentation for Hooks, Guard and Redirect.
