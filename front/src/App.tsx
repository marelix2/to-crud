import React, { Component } from 'react';
import TablesDisplayerPage from './containers/TablesDisplayerPage/TablesDisplayerPage';
import './styles/styles.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
       <TablesDisplayerPage/>
      </div>
    );
  }
}

export default App;
