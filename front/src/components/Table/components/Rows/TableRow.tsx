import React, { FunctionComponent } from 'react';
import { Col, Button} from 'antd'

const TableRow: FunctionComponent<RowProps> = (props) => {

  const row = props.row.map((r, index) =>{
  return r.type === 'actions' ?
  (
    <Col
    span={3}
    key={`${index}, co tam kolego`}
    className='action-items  col-item'
  >
    <Button type="primary" icon="select" onClick={() => props.updateClicked(props.row, props.rowIndex)}/>
    <Button type="danger" icon="delete" onClick={() => props.deleteClicked(props.row, props.rowIndex)}/>
    </Col>
  ) :
  (
    <Col
      span={3}
      key={`${index}, co tam kolego`}
      className='col-item'
    >
      {r.name}
    </Col>
  )}
  )

  return (
    <>
      {row}
    </>
  );
};

interface RowProps {
  row: Array<{ name: string, type: string, isPrimary: boolean }>
  updateClicked : (arr:Array<{ name: string, type: string, isPrimary: boolean }>, index: number) => void
  deleteClicked : (arr:Array<{ name: string, type: string, isPrimary: boolean }>, index: number) => void,
  rowIndex: number
}

export default TableRow;


