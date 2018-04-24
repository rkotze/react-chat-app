import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet'

function Layout({ route }) {
  return (<div className="layout">
    <Helmet
      titleTemplate={`%s | Ultimate universal app`}
      defaultTitle="Universal" />
    {renderRoutes(route.routes)}
  </div>
  )
}

export default Layout;