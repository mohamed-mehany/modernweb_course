import React, {Component} from 'react'
import socket from '~/src/socket'

class Messages extends Component {
  render() {
    return (<ul>
      {this.state.messages.map((message, index)=><li key={index} >{message.userId} says: {message.text}</li>)}
    </ul>)
  }
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
  componentWillMount() {
    socket.on('chat message', (msg) => {
      console.log(msg);
      this.setState(prevState=>{
        return {
          messages: prevState.messages.concat(msg)
        }
      })
    });
  }
}

export default Messages
