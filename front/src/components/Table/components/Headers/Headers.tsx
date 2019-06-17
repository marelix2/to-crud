
import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import {upperFirst} from 'lodash';
import './Headers.scss';

const Headers: FunctionComponent<HeadersProps> = (props) => {

  const cols = [ ...props.columns, {name: 'akcje', type: 'actions', isPrimary: false}]
  const headers = cols.map((column, index) => (
    <Col
      span={3}
      key={`key-${column.name}-${index}`}
      className='field-header'
      
    >
    {`${upperFirst(column.name)} ${column.isPrimary ? '(PK)' : ""}`} 
    </Col>
  ));
  return (
    <>
      <Row gutter={24}
       type='flex'
        justify='center'
        style={{margin: 0}}
        >
        {headers}
      </Row>
    </>
  );
};

interface HeadersProps {
  columns: Array<{ name: string, type: string ,isPrimary: boolean}>
}

export default Headers;
