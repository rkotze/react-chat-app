import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import io from 'socket.io-client';

class Home extends React.Component {
  state = {
    messages: [],
    inputMessage: '',
    status: 'no connection',
    groupList: []
  }

  socket = null;

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      this.setState({ status: 'Connected: ' + this.socket.id });
      this.socket.emit('addUser', prompt("What's your name?"));
    });
    this.socket.on('updateChat', (username, msg) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, username + ': ' + msg]
      }));
    });
    this.socket.on('updateRooms', (rooms, currentGroup) => {
      this.setState({
        groupList: rooms,
        currentGroup: currentGroup
      });
    });
  }

  handleInputMessage = (e) => {
    this.setState({ inputMessage: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.socket.emit('sendChat', this.state.inputMessage);
    this.setState({
      inputMessage: ''
    });
  }

  render() {
    const { inputMessage,
      messages,
      status,
      groupList,
      currentGroup
    } = this.state;
    return (
      <div className="home">
        <Helmet
          title="Chat"
          meta={[
            { name: 'description', content: 'chat' }
          ]} />
        <ChatBox>
          <Groups socket={this.socket} currentGroup={currentGroup} groupList={groupList} />
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
class Groups extends React.Component {
  handleRoomClick = (roomName) => {
    return () => {
      this.props.socket.emit('switchRoom', roomName);
    }
  }

  render() {
    const { groupList } = this.props;
    return (<div className="groups">
      {groupList.map((group) =>
        <div key={group} onClick={this.handleRoomClick(group)}>
          {group}
        </div>)}
    </div>);
  }
}

export default Home;