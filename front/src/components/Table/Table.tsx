import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import Headers from './components/Headers/Headers';
import Rows from './components/Rows/Rows';
import Search from './components/Search/Search';
import { filter, reduce, upperCase, isEqual } from 'lodash';
import './Table.scss'

class Table extends Component<TableProps, TableState> {

  constructor(props: TableProps) {
    super(props);

    this.state = {
      rowsData: this.props.rows,
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      rows: []
    }
  }

  componentDidUpdate(prevProps: TableProps, prevState: TableState) {
    if (!isEqual(this.props.rows, prevProps.rows)
     || !isEqual(this.state.currentPage, prevState.currentPage) 
     || !isEqual(this.state.pageSize, prevState.pageSize)
     || !isEqual(this.state.rowsData, prevState.rowsData)) {
      this.setState({ rows: this.renderRows() })
    }
  }

  componentDidMount() {
    this.setState({ rows: this.renderRows() })
  }

  shouldShowRow = (index : number) => {
    return (this.state.currentPage - 1) * this.state.pageSize <= index && index < this.state.currentPage * this.state.pageSize;
  }

  renderRows = () => {
    const paginatedRows = this.state.rowsData.filter((row, index)=> this.shouldShowRow(index) )
    return (<Rows rows={paginatedRows} />)
  }


  searchDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      rowsData: [...filter(this.props.rows, (row) => {
        const str = reduce(row, (result, r) => {
          return result + upperCase(r[Object.keys(r)[0]]);
        }, "")
        return str.includes(upperCase(e.target.value))
      })]
    })
  }

  onShowSizeChange = (current: number, pageSize: number) => {
    this.setState({
      pageSize: pageSize,
      currentPage: current
    });
  }

  onPageChange = (page: number, pageSize: number | undefined) => {
    this.setState({
      currentPage: page
    });
  }

  render() {

    const { rowsData, currentPage, rows } = this.state
    const { headers, } = this.props

    const pagination =(
      <Col>
        <Pagination
          defaultCurrent={currentPage}
          total={rowsData.length}
          onShowSizeChange={this.onShowSizeChange}
          onChange={this.onPageChange}
          showSizeChanger={true}
        />
      </Col>)


    return (
      <>
        <Row type='flex' justify='start'>
          <Col offset={5} span={12}>
            <Search
              placeholder='Search...'
              changed={(evt) => this.searchDataHandler(evt)}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Headers columns={headers} />
          </Col>

        </Row>

        <Row type="flex" justify="center">
          <Col span={22}>
            {rows}
          </Col>
        </Row>
        <Row type='flex' justify='end' className='table-pagination'>
          <Col span={8}>
            {pagination}
          </Col>
        </Row>
      </>
    )
  }
}

interface TableProps {
  rows: Array<any>
  headers: Array<{ name: string, type: string }>
}

interface TableState {
  rowsData: Array<Array<{ name: string, type: string }>>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  rows: any;
}


export default Table;