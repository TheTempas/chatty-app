import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    return (
      <main className="messages">
        {this.props.messages.map(message => {
          console.log("message", message);
          return (
            <Message key={message.id} username={message.username} content={message.content} type={message.type} previoususer={message.previoususer} name={message.name} />
            )
          }
        )
      }
      </main>
    )
  }
}

// <Message /> takes values out of messages, iteraties and passes to Message.jsx

export default MessageList;