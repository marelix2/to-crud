import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import ToDivider from '../../components/ToDivider/ToDivider';
import Table from '../../components/Table/Table';
import './SingleTableDisplayerPage.scss';

export default class SingleTableDisplayerPage extends Component<SingleTableDisplayerPageProps, SingleTableDisplayerPageState> {

  constructor(props: SingleTableDisplayerPageProps) {
    super(props)
    this.state = {
      tableName: this.props.location.pathname.slice(1, this.props.location.pathname.length - 1)
    }
  }



  handleBack = () => {
    this.props.history.push('/')
  }

  render() {

    const { tableName } = this.state;

    const headers = [
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }]

    const rows = [[
      { name: 'cos2', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos3', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos4', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos5', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos6', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos7', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos8', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos9', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos10', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos11', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos12', type: 'cos' },
      { name: 'co1', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }],
    [
      { name: 'cos13', type: 'cos' },
      { name: 'kocham', type: 'cos' },
      { name: 'cos', type: 'cos' },
      { name: 'cos', type: 'cos' }]]


    return (
      <>
        <Button
          type='primary'
          onClick={this.handleBack}
          className='back-btn'
        >
          <Icon type="left" />
          Powrót
        </Button>
        <ToDivider title={`Tabela: ${tableName}`} />
        <Table rows={rows} headers={headers} />
      </>
    )
  }
}

interface SingleTableDisplayerPageProps extends RouteComponentProps<any> {

}

interface SingleTableDisplayerPageState {
  tableName: string | undefined;
}