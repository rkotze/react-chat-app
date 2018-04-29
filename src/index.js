import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import manageSocket from "./manage-socket";

class Home extends React.Component {
  state = {
    messages: [],
    inputMessage: "",
    status: "no connection",
    groupList: []
  };

  socket = null;

  componentDidMount() {
    this.socket = manageSocket();
    this.socket.connect(() => {
      this.setState({ status: "Connected: " + this.socket.id });
    });

    this.socket.updateChat((username, msg) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, username + ": " + msg]
      }));
    });

    this.socket.updateRooms((rooms, currentGroup) => {
      this.setState({
        groupList: rooms,
        currentGroup: currentGroup
      });
    });
  }

  handleInputMessage = e => {
    this.setState({ inputMessage: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.socket.sendChat(this.state.inputMessage);
    this.setState({
      inputMessage: ""
    });
  };

  render() {
    const {
      inputMessage,
      messages,
      status,
      groupList,
      currentGroup
    } = this.state;
    return (
      <div className="home">
        <Helmet
          title="Chat"
          meta={[{ name: "description", content: "chat" }]}
        />
        <ChatBox>
          <Groups
            socket={this.socket}
            currentGroup={currentGroup}
            groupList={groupList}
          />
          <div className="message-box">
            <div className="message-list">
              <p>Status: {status}</p>
              {messages.map(message => <p>{message}</p>)}
            </div>

            <form className="message-form" onSubmit={this.handleSubmit}>
              <input
                className="message-input"
                onChange={this.handleInputMessage}
                value={inputMessage}
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        </ChatBox>
      </div>
    );
  }
}

class AddUser extends React.Component {
  state = { username: null };

  socket = null;

  componentDidMount() {
    this.socket = manageSocket();
  }

  handleNameChange = e => {
    this.setState({
      username: e.target.value,
      showUsername: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.socket.addUser(this.state.username);
    this.setState({
      showUsername: true
    });
  };

  render() {
    const { username, showUsername } = this.state;
    if (showUsername) {
      return <div>{username}</div>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <p>Add username to activate chat.</p>
        <label>
          Name:
          <input
            name="username"
            value={username}
            onChange={this.handleNameChange}
          />
        </label>
      </form>
    );
  }
}

const ChatBox = ({ children }) => <div className="chat-box">{children}</div>;
class Groups extends React.Component {
  socket = null;

  componentDidMount() {
    this.socket = manageSocket();
  }

  handleRoomClick = roomName => {
    return () => {
      this.socket.switchRoom(roomName);
    };
  };

  render() {
    const { groupList } = this.props;
    return (
      <div className="groups">
        <AddUser />
        {groupList.map(group => (
          <div key={group} onClick={this.handleRoomClick(group)}>
            {group}
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
