import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';

import routes from '../src/routes';

const start = (req, res) => {
  let context = {};
  const body = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>
  );
  const head = Helmet.rewind();

  const html = `
  <!doctype html>
  <html>
    <head>
      ${head.title}
      ${head.meta}
      <link rel="stylesheet" href="/layout.css">
    </head>
    <body>
      ${body}
      <script src="/bundle.js"></script>
    </body>
  </html>`;

  if (context.status === 404)
    res.status(404);

  res.send(html);
};

export { start };