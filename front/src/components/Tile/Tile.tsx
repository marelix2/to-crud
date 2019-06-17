import React from 'react';
import { Card } from 'antd';
import './Tile.scss'

const Tile = (props: ITileProps) => {

  const { name, columns, clicked } = props;

  const cols = columns.map((column: Column, index: number) => {
    return (
      <div key={index}>
        <div className='tile-col'>{column.name}: {column.type}  {column.isPrimary ? "(PK)": ""}</div>
      </div>
    )
  })

  return (
    <>
      <Card
        size="small"
        title={` Nazwa tabeli: ${name}`}
        style={{ margin:'0.8em'}}
        onClick={() => clicked(name)}
      >
        <div className='tile-header'>kolumny:</div>
        {cols}

      </Card>
    </>
  );

};

interface Column {
  isPrimary: boolean;
  name: string;
  type: string;
}

interface ITileProps {
  name: string;
  columns: [Column];
  clicked: any;
}

export default Tile;