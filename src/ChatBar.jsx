import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log(this.props.currentUser.name);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.addNewMessage} />
      </footer>
  )}
}

export default ChatBar;