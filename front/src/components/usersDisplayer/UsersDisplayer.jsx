import React, { Component } from 'react';
import API from '../../endpoints'
import axios from '../../AxiosApi'

class UsersDisplayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      user: null
    }
  }

  fetchUsers = () => {
    axios.get(API.GET_USERS).then((response) => this.setState({ users: response.data.data }))
  }

  fetchUser = (id) => {
    axios.get(API.GET_USER(id)).then((response) => this.setState({ user: response.data.data })) 
  }

  componentDidMount() {
    this.fetchUsers();
   // this.fetchUser(1);
  }


  render() {
    const { users, user } = this.state

    console.log(users)
    return (
      <>
        {JSON.stringify(users, null, 4)}
        
        <br/>
        {JSON.stringify(user)}
      </>
    );
  }
}

export default UsersDisplayer;