import React, { Component } from 'react';


 class Table extends Component<ITableProps,ITableState> {

  constructor(props: ITableProps){
    super(props);
  }

  render() {
    return (
      <div>
        fajna tabelka
      </div>
    )
  }
}

interface ITableProps {

}

interface ITableState {

}


export default Table;