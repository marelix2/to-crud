import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import TableRow from './TableRow';
import './Rows.scss';


const Rows: FunctionComponent<RowsProps> = (props) => {

  const data = props.rows.map((row) => {
    return [...row, { name: 'actions', type: 'none' }]
  })
  const convertedRows = data.map((array, index) => (
    <Row
      type='flex'
      justify='center'
      key={`${index}-cos-c`}
      className='row-item'
    >
      <TableRow row={array} />
    </Row>
  ));

  return (
    <>
      {convertedRows}
    </>
  );
};

interface RowsProps {
  rows: Array<Array<{ name: string, type: string }>>
}



export default Rows;