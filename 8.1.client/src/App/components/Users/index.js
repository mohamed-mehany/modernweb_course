import React, {Component} from 'react'
import socket from '~/src/socket'

class Users extends Component {
  render() {
    return (<ul>
      {this.state.users.map((user, index)=><li key={index} >{user}</li>)}
    </ul>)
  }
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  componentWillMount() {
    socket.on('users', (user) => {
      this.setState(prevState=>{
        return {
          users: user
        }
      })
    });
  }
}

export default Users
