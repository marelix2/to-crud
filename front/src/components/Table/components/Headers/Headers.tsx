
import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import {upperFirst} from 'lodash';
import './Headers.scss';

const Headers: FunctionComponent<HeadersProps> = (props) => {

  const cols = [ ...props.columns, {name: 'akcje', type: 'actions'}]
  const headers = cols.map((column, index) => (
    <Col
      span={3}
      key={`key-${column.name}-${index}`}
      className='field-header'
    >
    {upperFirst(column.name)} 
    </Col>
  ));
  return (
    <>
      <Row gutter={24} type='flex' justify='center'>
        {headers}
      </Row>
    </>
  );
};

interface HeadersProps {
  columns: Array<{ name: string, type: string }>
}

export default Headers;
