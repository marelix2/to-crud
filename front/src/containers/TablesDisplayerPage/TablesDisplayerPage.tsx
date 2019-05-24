import React, { Component } from 'react'
import API from '../../endpoints'
import axios from '../../AxiosApi'

import Tile from './../../components/Tile/Tile'
import { Col, Row, Divider } from 'antd';
import ToDivider from '../../components/ToDivider/ToDivider';
import { RouteComponentProps } from 'react-router-dom';



class TablesDisplayerPage extends Component<ITablesDisplayerPageProps, ITablesDisplayerPageState> {

  constructor(props: ITablesDisplayerPageProps) {
    super(props);
    this.state = {
      tables: []
    }
  }

  componentDidMount() {
    this.fetchTables();
  }

  componentWillReceiveProps(nextProps: any, nextState :any) {
    console.log(nextProps)

    return true
  }

  fetchTables = () => {
    axios.get(API.GET_TABLES).then((response: any) => {
      this.setState({ tables: response.data.tables })
    })
  }

  handleTileClicked = (tableName: string) => {
    this.props.history.push(`/${tableName}`)
  }


  render() {
    const { tables } = this.state;

    const tiles = tables.map((table: any) => {
      return (
        <Col
          span={6}
          key={`key-${table.tableName}`}
        >
          <Tile
            name={table.tableName}
            columns={table.columns}
            clicked={this.handleTileClicked}
          />
        </Col>
      )
    })

    return (
      <>
        <ToDivider title='Dostępne Tabele' />
        <Row>
          {tiles}
        </Row>
      </>
    )
  }
}

interface ITablesDisplayerPageState {
  tables: Array<any>;
}


interface ITablesDisplayerPageProps extends RouteComponentProps<{table : string}> {
}

export default TablesDisplayerPage;