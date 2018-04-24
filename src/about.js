import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet'

export default function About({ route, children }) {
  return (
    <div>
      <Helmet
        title="About me"
        meta={[
          { name: 'description', content: 'About the world page' }
        ]} />
      <h2>About</h2>
      <p>Here is some text. <Link to="/">Home</Link> <Link to="/about/sub">sub</Link></p>
      {renderRoutes(route.routes)}
    </div>
  )
}