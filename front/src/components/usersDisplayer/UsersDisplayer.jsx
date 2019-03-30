import React, { Component } from 'react';
import API from '../../endpoints'
import axios from '../../AxiosApi'

class UsersDisplayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tables: []
    }
  }

  fetchTables = () => {
    axios.get(API.GET_USERS).then((response) => {
      return this.setState({ tables: response.data.tables })
    });
  }

  fetchUser = (id) => {
    axios.get(API.GET_USER(id)).then((response) => this.setState({ user: response.data.data })) 
  }

  componentDidMount() {
    this.fetchTables();
    //this.fetchUser(1);
  }


  render() {
    const { tables } = this.state
    console.log(tables)
    return (
      <>
        {JSON.stringify(tables)}
        <br/>
      </>
    );
  }
}

export default UsersDisplayer;