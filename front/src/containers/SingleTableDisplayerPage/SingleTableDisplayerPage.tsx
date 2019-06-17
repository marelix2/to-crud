import React, { Component } from 'react';
import { Button, Icon,notification } from 'antd';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ToDivider from '../../components/ToDivider/ToDivider';
import Table from '../../components/Table/Table';
import axios from '../../AxiosApi'
import API from '../../endpoints'

import './SingleTableDisplayerPage.scss';
import Rows from '../../components/Table/components/Rows/Rows';

export default class SingleTableDisplayerPage extends Component<SingleTableDisplayerPageProps, SingleTableDisplayerPageState> {

  constructor(props: SingleTableDisplayerPageProps) {
    super(props)
    this.state = {
      tableName: this.props.location.pathname.slice(1, this.props.location.pathname.length),
      headers: [],
      rows: [],
      updateRow: {
        clicked: false,
        updating: false,
        row: [],
        rowIndex: 0,
        headers: [],
        tableName: undefined
      }
    }
  }

  componentDidMount() {
    this.fetchTableHeaders()
    this.fetchTableData()
  }

  fetchTableHeaders = () => {
    axios.put(API.GET_TABLE_HEADERS, { tableName: this.state.tableName }).then((response: any) => {
      console.log(response.data.headers)
      const headers = response.data.headers.map((header: any) => {
        return {
          name: header.name,
          type: header.type,
          isPrimary: header.isPrimary
        }
      })
      this.setState({ headers })
    })
  }

  fetchTableData = () => {
    axios.put(API.GET_TABLE_ROWS, { tableName: this.state.tableName }).then((response: any) => {
      const rows = response.data.rows.map((r: any) => {
        const keys = Object.keys(r);
        const arr = [];
        for (let i = 0; i < keys.length; i++) {
          arr.push({ name: r[keys[i]], type: typeof r[keys[i]] })
        }
        return arr;
      });

      this.setState({ rows })
    })
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleUpdateClick = (arr: Array<{ name: string, type: string , isPrimary: boolean}>, index: number) => {
    const {headers,tableName } =  this.state

    this.setState({
      updateRow: {
        clicked: true,
        updating: true,
        row: arr,
        rowIndex: index,
        headers: headers,
        tableName: tableName
      }
    })

  }

  handleInsertClick = () => {
    const {headers,tableName } =  this.state

    this.setState({
      updateRow: {
        clicked: true,
        updating: false,
        row: headers.map((h) => ({name: h.name, type: h.type, isPrimary: h.isPrimary})),
        rowIndex: 0,
        headers: headers,
        tableName: tableName
      }
    })

  }

  handleDeleteClick = (arr: Array<{ name: string, type: string, isPrimary: boolean}>, index: number) => {
    const {tableName } =  this.state
    axios.delete(API.POST_TABLE_ROW, { data : {
      id: index,
      tableName: tableName
    }
  }).then((res) => {
    res && notification.success({
      message: `${res.data.msg}`,
      description: `(»◡«)`
    });
      this.fetchTableData()
  })
  }

  render() {

    const { tableName, headers, rows, updateRow } = this.state;

    if (updateRow.clicked) {
      return <Redirect to={{
        pathname: '/row',
        state: {
          row: updateRow.row,
          updating: updateRow.updating,
          rowIndex: updateRow.rowIndex,
          headers: updateRow.headers,
          tableName: updateRow.tableName
        }
      }} />
      
    }

    return (
      <>
        <Button
          type='primary'
          onClick={this.handleBack}
          className='back-btn'>
          <Icon type="left" />
          Powrót
        </Button>
        <Button
          type='primary'
          onClick={this.handleInsertClick}
          className='back-btn'>
          Dodaj Wiersz
          <Icon type="right"/>
        </Button>
        <ToDivider title={`Tabela: ${tableName}`} />
        
        {rows && (<Table rows={rows} headers={headers} handleDeleteClick={this.handleDeleteClick} handleUpdateClick={this.handleUpdateClick} />)}
      </>
    )
  }
}

interface SingleTableDisplayerPageProps extends RouteComponentProps<any> {

}

interface SingleTableDisplayerPageState {
  tableName: string | undefined;
  headers: Array<{ name: string, type: string, isPrimary: boolean }>
  rows: Array<Array<Field>>,
  updateRow: {
    clicked: boolean,
    updating: boolean,
    row: Array<Field>,
    rowIndex: number,
    headers: Array<{ name: string, type: string, isPrimary: boolean }>
    tableName: string | undefined
  }
}

interface Field {
  name: string | number;
  type: string;
}