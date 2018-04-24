import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import io from 'socket.io-client';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      inputMessage: '',
      status: 'no connection'
    };
    this.socket;
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.setState({ status: 'Connected: ' + this.socket.id });
    });
    this.socket.on('chat message', (msg) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, msg]
      }));
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  handleInputMessage = (e) => {
    this.setState({ inputMessage: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.socket.emit('chat message', this.state.inputMessage);
    this.setState({
      inputMessage: ''
    });
  }

  render() {
    const { inputMessage, messages, status } = this.state;
    return (
      <div>
        <Helmet
          title="Chat"
          meta={[
            { name: 'description', content: 'chat' }
          ]} />
        <h1>Chat</h1>
        <p>Status: {status}</p>
        {messages.map((message) => <p>{message}</p>)}
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputMessage} value={inputMessage} />
          <input type="submit" value="send" />
        </form>

      </div>
    );
  }
}

export default Home;