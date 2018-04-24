import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet'

class Home extends React.Component {
  handleClick() {
    alert('you clicked me');
  }

  render() {
    return (
      <div>
        <Helmet
          title="Hello world, welcome!"
          meta={[
            { name: 'description', content: 'Hello world page' }
          ]} />
        <h1>Hello world.</h1>
        <p>Server side rendering <Link to="/about">About</Link> </p>
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

export default Home;