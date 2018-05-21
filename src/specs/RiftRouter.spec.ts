import { IRiftRoute } from '../IRiftRoute';
import { RiftRouter } from '../RiftRouter';
const routes: IRiftRoute[] = [
  {
    path: '',
    component: () => 'home',
  },
  {
    path: '/login',
    component: () => 'login',
  },
  {
    path: '',
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

const router = new RiftRouter(routes);

test('Test Home Route', () => {
  const path = '/';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('home');
});

test('Test Single Route none Home', () => {
  const path = '/login';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('login');
});

test('Test Level 2 Nested Route', () => {
  const path = '/contacts';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts');
});

test('Test Level 2 Nested Route With Params', () => {
  let path = '/contacts/5';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts editor');

  path = '/admin/users/1';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '1' });
  expect(router.active.components[0]()).toBe('admin');
  expect(router.active.components[1]()).toBe('users editor');
});

test('Test Level 2 Nested Route Change To Empty Object', () => {
  let path = '/contacts/5';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('contacts editor');

  path = '/login';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({});
  expect(router.active.components[0]()).toBe('login');
});

test('Test Level 3 Nested Route with 2 Params variables', () => {
  const path = '/categories/5/tags/10';
  router.riftTo(path, false);
  expect(router.path).toBe(path);
  expect(router.params).toEqual({ id: '5', tagsId: '10' });
  expect(router.active.components[0]()).toBe('/');
  expect(router.active.components[1]()).toBe('categories');
  expect(router.active.components[2]()).toBe('tags');
});
