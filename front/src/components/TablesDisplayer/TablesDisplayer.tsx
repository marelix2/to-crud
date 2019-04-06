import React, { Component } from 'react'
import API from '../../endpoints'
import axios from '../../AxiosApi'
interface State {
  tables : [];
}


class TablesDisplayer extends Component<{},State> {

  constructor(props: {}){ 
    super(props);
    this.state = {
      tables: []
    }
  }

  componentDidMount() {
    this.fetchTables();
  } 

  fetchTables = () => {
    axios.get(API.GET_TABLES).then((response:any) =>{
      this.setState({ tables: response.data.tables })
    })
  }

  render() {

    const {tables} = this.state;

    return (
      <div>
          {JSON.stringify(tables)}
      </div>
    )
  }
}

export default TablesDisplayer