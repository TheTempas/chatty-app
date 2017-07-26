import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const socket = new WebSocket("ws://localhost:3001");
console.log("Connected to chatty-app server");

class App extends Component {
// Class is the blueprint of a car.
// When you run the code and constructor is executed the car is built.
// Now that you have the car, "this" refers to the car throughout.

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
    this.renderMessage = this.renderMessage.bind(this);

    socket.addEventListener("message", this.renderMessage)

    // Everything in constructor sets up the game so to speak: door open (listening), received message.
  }

  addNewMessage (event) {
    // event is data to do with this particular event (onKeyUp for a specific key)
    console.log("Update state");
    if (event.keyCode === 13) {
      let newMessage = {username: this.state.currentUser.name, content: event.target.value};
      socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

  renderMessage (event) {
    let newMessage = JSON.parse(event.data);
    let messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
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