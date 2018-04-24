import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet'

function Layout({ route }) {
  return (<div>
    <Helmet
      titleTemplate={`%s | Ultimate universal app`}
      defaultTitle="Universal" />
    <h1>Universal app</h1>
    {renderRoutes(route.routes)}
  </div>
  )
}

export default Layout;