# rift-router ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Cervantes007/rift-router.svg?branch=master)](https://travis-ci.org/Cervantes007/rift-router) [![codecov](https://codecov.io/gh/Cervantes007/rift-router/branch/master/graph/badge.svg)](https://codecov.io/gh/Cervantes007/rift-router)

Blazing Fast and Lightweight router for React Based on state first..

## Features

- Lightweight 1.6kb (min/gzip) - 4.3kb (min)
- No Dependencies
- Blazing Fast update app state first and then Browser Sync.
- Useful route information in `params`, `search`, `path` and `active` router properties.
- Typescript first class, but works fine with javascript too.
- Nesting Route.
- Lazy loading for route component.
- Hooks `onEnter` and `onLeave`.
- Redirect.
- Route Guard.
- Automatic Browser Sync
- Isomorphic.

## Installation

`npm i -s rift-router`

## Usage

```typescript
import React, {lazy} from 'react';
import ReactDOM from 'react-dom';
import { IRiftRoute, RiftProvider, RiftGate, RiftLink } from 'rift-router';

const Home = () => <div>'Home Component'</div>;
const About = () => <div>'About Component'</div>;

const routes: IRiftRoute[] = [
  { path: '/', component: <Home /> },
  { path: '/about', component: () => <About /> },
  { path: '/users', component: lazy(() => import('./users')),
];

ReactDOM.render(
  <RiftProvider routes={routes} fallback={<div>loading...</div>}>
    <RiftLink to="/">Home</RiftLink>
    <RiftLink to="/about">About</RiftLink>
    <RiftGate /> {/* render the component for current route */}
  </RiftProvider>,
  document.getElementById('root')
);
```

Check basic usage in a sandbox:

[![Edit RiftRouter Basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/myq5nowwwp)

#### and that's it, try it.

## Routes object options.

#### Using Hooks:

```typescript
function isUserLogged() {...}
const routes = [
    {
        path: '/users',
        component: <UserList />,
        onLeave: () => '...Do some logic when current route will change',
        onEnter: () => {
            if(!isUserLogged()) {
                return '/login';
            }
        }
    }
]
```

`onEnter` run just before set new route, therefore it can be used as route Guard, if `onEnter` return an string value, the router will redirect to this value.

#### Handle route not match

```typescript
const routes = [
  // Default route (*) redirect to '/'
  { path: '*', onEnter: () => '/' },
  // Default route keep browser url and show Home component
  { path: '*', component: <Home /> },
  // Default route show Not Found Page component
  { path: '*', component: <NotFound404 /> },
];
```

#### Nesting routes

```typescript
const routes: IRiftRoute[] = [
  {
    path: '/admin',
    component: () => 'admin',
    children: [
      {
        path: '/users',
        component: () => 'users',
      },
      {
        path: '/users/:id?',
        component: () => 'users editor',
      },
    ],
  },
];
```

`note:` For each nesting you must place a `<RiftGate/>` component to display current nesting component.

#### Building your routes with many files and lazy loading components.

```typescript
// somewhere in the users module/folder
export const usersRoutes = [
  {
    path: '',
    component: React.lazy(import('./UserList')),
  },
  {
    path: '/:id',
    component: React.lazy(import('./UserDetails')),
  },
];
```

```typescript
// building your routes with others routers files.
const routes: IRiftRoute[] = [
  {
    path: '/users',
    children: usersRoutes,
  },
];
```

Lazy loading your component will reduce the first load time, therefore your page will be show faster, then other component will be load in demand.

Caveat: `React.lazy and Suspense are not yet available for server-side rendering. If you want to do code-splitting in a server rendered app check <a href="https://reactjs.org/docs/code-splitting.html#reactlazy">here</a>`

### `router` instance API:

- `path` (show current path - `router.path` -> '/users')
- `params` (for path = `/users/:id` - current route = 'users/5' -> `router.params` = `{id: 5}`)
- `search` (for route = `/users?from=home` -> `router.search` = `{from: "home"}`)
- `to` function receive a `string` parameter for navigate to (router.to('/users'))

## How to get router object

1.  In your component use the router from RiftContext using useRouter hook.

```typescript
const Home = () => {
  const router = useRouter();
  const toAbout = () => router.to('/about');
  return (
    <div>
      <div>Home Component</div>
      <button onClick={toAbout}>About us</button>
    </div>
  );
};
```

2.  In your route inject the router instance as a `component` prop, same for `onEnter` and `onLeave` hooks

```typescript
const routes: IRiftRoute[] = [
  { path: '/', component: <Home />, onEnter: router => {...} },
  { path: '/about', component: router => <About router={router} /> },
];
```

## How it Work.

Pass your `routes` to `RiftProvider` and it will create a router instance and share it through `React.Context` to be use deep in the component tree
with the `useRouter` hook.
`RiftProvider` also accept a `fallback` prop where you can provide a component to will be shown by all yours `RiftGate` while lazy components finish to load.
ex. `<RiftProvider routes={routes} fallback={<div>loading...</div>}>...</RiftProvider>`

`RiftGate` works as a gateway to show the correct component for the active route. If you have nesting routes you must
use the same number of `RiftGate` to render the nested components in the active route. Also accept a `fallback` prop
where you can provide a component to show while lazy components finish to load, this will override the `fallback` of the `RiftProvider`.
ex. `<RiftGate fallback={<div>loading...</div>} />`

`RiftLink` API:

- `to` (string value to navigate on click event)
  ex. `<RiftLink to="/users" />`

Note: `you need to use react@16.8.0 version or superior`

## TODO:

#### Add Documentation for

- [x] Code Splitting.
- [ ] Server Side Rendering Example.
