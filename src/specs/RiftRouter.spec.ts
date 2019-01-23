import { IRiftRoute } from '../IRiftRoute';
import { Router } from '../Router';
const routes: IRiftRoute[] = [
  {
    path: '',
    component: () => 'home',
  },
  {
    path: 'redirect',
    component: () => 'redirect',
    onEnter: () => '/',
  },
  {
    path: '*',
    component: () => 'default',
  },
  {
    path: '/login',
    component: () => 'login',
  },
  {
    path: '///',
    component: () => '/',
    children: [
      {
        path: '/contacts',
        component: () => 'contacts',
      },
      {
        path: '/contacts/:id',
        component: () => 'contacts editor',
      },
      {
        path: '/categories/:id',
        component: () => 'categories',
        children: [
          {
            path: '/tags/:tagsId',
            component: () => 'tags',
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: () => 'admin',
    children: [
      {
        path: 'users',
        component: () => 'users',
      },
      {
        path: 'users/:id?',
        component: () => 'users editor',
      },
    ],
  },
];

const routerSSR = new Router(routes, '/login');
const router = new Router(routes);

test('SSR', () => {
  expect(routerSSR.active.components[0]()).toBe('login');
});

test('Test Home Route', () => {
  const path = '/';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('home');
});

test('Default Route', () => {
  const path = '/routeNotFound';
  router.riftTo(path);
  expect(router.path).toBe('/routeNotFound');
  expect(router.active.components[0]()).toBe('default');
});

test('Test Single Route none Home', () => {
  const path = '/login';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('login');
});

test('Test Level 2 Nested Route', () => {
  const path = '/contacts';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts');
});

test('Test Level 2 Nested Route With Params', () => {
  let path = '/contacts/5';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts editor');

  path = '/admin/users/1';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '1' });
  expect(router.active.components[0]()).toBe('admin');
  expect(router.active.components[1]()).toBe('users editor');
});

test('Test Level 2 Nested Route Change To Empty Object', () => {
  let path = '/contacts/5';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts editor');

  path = '/login';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({});
  expect(router.active.components[0]()).toBe('login');
});

test('Test Level 3 Nested Route with 2 Params variables', () => {
  const path = '/categories/5/tags/10';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5', tagsId: '10' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('categories');
  expect(router.active.components[2]()).toBe('tags');
});

test('Test Query String', () => {
  const path = '/contacts?type=plumber';
  router.riftTo(path);
  expect(router.path).toBe(path);
  expect(router.search).toEqual({ type: 'plumber' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts');
});

test('Test OnEnter Guard Redirect', () => {
  const path = '/redirect';
  router.riftTo(path);
  expect(router.path).toBe('/');
  expect(router.active.components[0]()).toBe('home');
});

test('Test BrowserSync', () => {
  router.riftRouterBrowserSync();
  expect(router.path).toBe('/');
  expect(router.active.components[0]()).toBe('home');
});

test('RiftGate register', () => {
  expect(router.register()).toBe(0);
  expect(router.register()).toBe(1);
});

test('Test Exception incorrect value to riftTo', () => {
  const path = 'exception';
  try {
    router.riftTo(path);
  } catch (e) {
    expect(e.message).toBe('The given url must start with /');
  }
});
