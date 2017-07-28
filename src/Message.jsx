import React, {Component} from 'react';

class Message extends Component {
  render () {

    if (this.props.type === "postMessage") {
      let regexep = /(jpg|png|gif)/
      if (this.props.content.match(regexep)) {
        return (
        <div className="message">
          <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
          <span className="message-content">
            <img src={this.props.content} />
          </span>
        </div>
        )
      }
      else {
        return (
          <div className="message">
            <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
      }
    }

    else if (this.props.type === "postNotification") {
      return (
        <div className="message system">
          {this.props.previoususer} changed their name to {this.props.name}
        </div>
      )
    }
  }
}

export default Message;