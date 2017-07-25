import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
          currentUser: {name: "Joe"},
          messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addNewMessage = this.addNewMessage.bind(this);
}

  addNewMessage (event) {
    // the event parameter is data to do with this particular event (onKeyUp for any key)
    console.log("Update state");
    if (event.keyCode === 13) {
      let newMessage = {username: this.state.currentUser.name, content: event.target.value};
      let messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
      event.target.value = '';
    }
  }

  render() {
    return (
      <div className="wrapper">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage}/>
      </div>
    );
  }
}

export default App;