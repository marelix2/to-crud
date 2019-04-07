import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import ToDivider from '../../components/ToDivider/ToDivider';
import Table from '../../components/Table/Table';
import './SingleTableDisplayerPage.scss';

export default class SingleTableDisplayerPage extends Component<ISingleTableDisplayerPageProps, ISingleTableDisplayerPageState> {

  constructor(props: ISingleTableDisplayerPageProps) {
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
        <Table />
      </>
    )
  }
}

interface ISingleTableDisplayerPageProps extends RouteComponentProps<any> {

}


interface ISingleTableDisplayerPageState {
  tableName: string | undefined;
}