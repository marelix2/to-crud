import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import TableRow from './TableRow';
import './Rows.scss';


const Rows: FunctionComponent<RowsProps> = (props) => {

  const data = props.rows.map((row) => {
    return [...row, { name: 'actions', type: 'actions', isPrimary: false }]
  })
  const convertedRows = data.map((array, index) => (
    <Row
      type='flex'
      justify='center'
      key={`${index}-cos-c`}
      className='row-item'
    >
      <TableRow row={array}  updateClicked={props.onUpdateClick} rowIndex={index}  deleteClicked={props.onDeleteClick}/>
    </Row>
  ));

  return (
    <>
      {convertedRows}
    </>
  );
};

interface RowsProps {
  rows: Array<Array<{ name: string, type: string, isPrimary: boolean }>>
  onUpdateClick : (arr:  Array<{ name: string, type: string, isPrimary: boolean }>, index: number) => void
  onDeleteClick : (arr:  Array<{ name: string, type: string, isPrimary: boolean  }>, index: number) => void
}



export default Rows;