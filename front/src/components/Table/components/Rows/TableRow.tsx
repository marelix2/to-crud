import React, { FunctionComponent } from 'react';
import { Col } from 'antd'

const TableRow: FunctionComponent<RowProps> = (props) => {

  const row = props.row.map((r, index) => (
    <Col
      span={3}
      key={`${index}, co tam kolego`}
      className='col-item'
    >
      {r.name}
    </Col>
  ))

  return (
    <>
      {row}
    </>
  );
};

interface RowProps {
  row: Array<{ name: string, type: string }>
}

export default TableRow;


