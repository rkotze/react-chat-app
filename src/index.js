import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import io from 'socket.io-client';

class Home extends React.Component {
  state = {
    messages: [],
    inputMessage: '',
    status: 'no connection'
  }

  socket = null;

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.setState({ status: 'Connected: ' + this.socket.id });
    });
    this.socket.on('chat message', (msg) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, msg]
      }));
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
      <div className="home">
        <Helmet
          title="Chat"
          meta={[
            { name: 'description', content: 'chat' }
          ]} />
        <ChatBox>
          <Groups groupList={[{ name: "Default Group" }]} />
          <div className="message-box">
            <div className="message-list">
              <p>Status: {status}</p>
              {messages.map((message) => <p>{message}</p>)}
            </div>
            <form className="message-form" onSubmit={this.handleSubmit}>
              <input className="message-input" onChange={this.handleInputMessage} value={inputMessage} />
              <input type="submit" value="Send" />
            </form>

          </div>
        </ChatBox>
      </div>
    );
  }
}

const ChatBox = ({ children }) => <div className="chat-box">{children}</div>;
const Groups = ({ groupList }) => <div className="groups">{groupList.map((group) => <div key={group.name}>{group.name}</div>)}</div>;

export default Home;