import React from 'react';
import { Link } from 'react-router-dom';

function Sub() {
  return (
    <div>
      <h2>Sub over here</h2>
      <p>Sublink. <Link to="/">Home</Link></p>
    </div>
  );
}
export default Sub;