import React, { Component } from 'react';
import socket from '~/src/socket'

import Messages from './components/Messages'
import Users from './components/Users'

class App extends Component {
  onChange = (event) => {
    // console.log("User typing");
    socket.emit('started typing');
  }
  constructor() {
    super();
    this.state = {
      typing: false,
      userId: -1
    };
  }
  render = () => {
    return (
      <app>
        <Users />
        <Messages />

        <form onSubmit={this.sendMessage}>
          {this.state.typing &&
            <h3>{this.state.userId} is typing </h3>
          }
          <input ref={(input)=> this.input = input } onChange={this.onChange} autoComplete="off" />
          <button onClick={this.sendMessage} >Send</button>
        </form>
      </app>
    );
  }
  componentWillMount = () => {
    socket.on('typed', () => {
      console.log("User ended");
      this.setState(prevState=>{
        return {
          typing: false,
          userId: -1
        };
      });
    });
    socket.on('started typing', (id) => {
      // console.log(id + " Another User is typing");
      // /console.log(id);
      // console.log(this.state.typing);
      this.setState(prevState=>{
        return {
          typing: true,
          userId: id
        };
      });
    });
  }
  sendMessage = (event) => {
    event.preventDefault();
    socket.emit('chat message', this.input.value);
    this.input.value = ''
    socket.emit('typed');
  }
}

export default App;
