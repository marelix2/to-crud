import React from 'react';
import { Card } from 'antd';
import './Tile.scss'

interface Column {
  name: string;
  type: string;
}

interface TileProps {
  name: string;
  columns: [Column];
  clicked: any;
}

const Tile = (props: TileProps) => {

  const { name, columns, clicked } = props;

  const cols = columns.map((column: Column, index: number) => {
    return (
      <div key={index}>
        <div className='tile-col'>{column.name}: {column.type}</div>
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

export default Tile;