import Layout from './layout';
import Home from './';
import About from './about';
import Sub from './sub';
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
        path: '/about',
        component: About,
        routes: [
          {
            path: '/about/sub',
            component: Sub,
          }
        ]
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
];

export default routes;