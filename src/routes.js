import Layout from './layout';
import Home from './';
import NotFound from './not-found';

const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];

export default routes;