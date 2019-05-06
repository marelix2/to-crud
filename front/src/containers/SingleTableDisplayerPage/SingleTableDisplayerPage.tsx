import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import ToDivider from '../../components/ToDivider/ToDivider';
import Table from '../../components/Table/Table';
import EditRowPage from '../EditRowPage/EditRowPage';
import axios from '../../AxiosApi'
import API from '../../endpoints'

import './SingleTableDisplayerPage.scss';

export default class SingleTableDisplayerPage extends Component<SingleTableDisplayerPageProps, SingleTableDisplayerPageState> {

  constructor(props: SingleTableDisplayerPageProps) {
    super(props)
    this.state = {
      tableName: this.props.location.pathname.slice(1, this.props.location.pathname.length),
      headers:[],
      rows: []
    }
  }

  componentDidMount() {
    this.fetchTableHeaders()
    this.fetchTableData()
  }

  fetchTableHeaders = () => {
    axios.put(API.GET_TABLE_HEADERS, {tableName : this.state.tableName}).then((response : any) => {
      const headers = response.data.headers.map((header: any) => {
        return {
          name: header.name,
          type: header.type
        }
      })
        this.setState({headers})
    })
  }

  fetchTableData = () => {
    axios.put(API.GET_TABLE_ROWS, {tableName : this.state.tableName}).then((response : any) => {
      const rows = response.data.rows.map((r: any) => {
        const keys = Object.keys(r);
        const arr= [];
        for(let i = 0; i < keys.length ; i++){
          arr.push({name: r[keys[i]], type: typeof r[keys[i]]})
        }
        return arr;
      })
      this.setState({rows})
      })
  }


  handleBack = () => {
    this.props.history.push('/')
  }

  render() {

    const { tableName, headers, rows} = this.state;

    return (
      <>
        <Button
          type='primary'
          onClick={this.handleBack}
          className='back-btn'>
          <Icon type="left" />
          Powrót
        </Button>
        <EditRowPage row={rows[0]} headers={headers} tableName ={tableName}/> 
        <ToDivider title={`Tabela: ${tableName}`} />
       {rows &&  (<Table rows={rows} headers={headers} />)} 
      </>
    )
  }
}

interface SingleTableDisplayerPageProps extends RouteComponentProps<any> {

}

interface SingleTableDisplayerPageState {
  tableName: string | undefined;
  headers: Array<{name:string, type: string}>
  rows:Array<Array<Field>>
}

interface Field {
  name: string | number;
  type: string; 
}