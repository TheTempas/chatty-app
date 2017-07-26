import React, {Component} from 'react';

import uuidv1 from 'uuid/v1';

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
          currentUser: {name: "Anonymouse"},
          messages: []
        }
    this.addNewMessage = this.addNewMessage.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }
    // Everything in constructor sets up the game so to speak: door open (listening), received message.

  setCurrentUser (event) {
    console.log("setting current user");
    if (event.keyCode === 13) {
      let currentUser = {name: event.target.value}
      this.setState({currentUser: currentUser});
    }
  }

  addNewMessage (event) {
    // event is data to do with this particular event (onKeyUp for a specific key)
    console.log("Update state");
    if (event.keyCode === 13) {
      let newMessage = {id: uuidv1(), username: this.state.currentUser.name, content: event.target.value};
      socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

  renderMessage (newMessage) {
    let messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  componentDidMount() {
    socket.onopen = function () {
      console.log("Connected to chatty-server");
    }
    socket.onmessage = (event) => {
      let input = JSON.parse(event.data);
      console.log("String", input);
      this.renderMessage(input);
      // Here is where all the other clients render the message on their browser.

    }
    console.log("componentDidMount <App />");
  }

  render() {
    return (
      <div className="wrapper">
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} addNewMessage={this.addNewMessage}/>
      </div>
    );
  }

// Bind: takes a function, then assigns it an object, when that function is running if it calls this
// for example this.setState
}
export default App;