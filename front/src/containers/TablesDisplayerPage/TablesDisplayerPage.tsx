import React, { Component } from 'react'
import API from '../../endpoints'
import axios from '../../AxiosApi'

import Tile from './../../components/Tile/Tile'
import { Col, Row, Divider } from 'antd';
import ToDivider from '../../components/ToDivider/ToDivider';

interface State {
  tables: any;
}

class TablesDisplayerPage extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      tables: []
    }
  }

  componentDidMount() {
    this.fetchTables();
  }

  fetchTables = () => {
    axios.get(API.GET_TABLES).then((response: any) => {
      this.setState({ tables: response.data.tables })
    })
  }

  handleTileClicked = (columnName: string) => {
    console.log('przechodze do widoku dla :', columnName)
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

export default TablesDisplayerPage;