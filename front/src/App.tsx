import React, { Component } from 'react';
import TablesDisplayerPage from './containers/TablesDisplayerPage/TablesDisplayerPage';
import SingleTableDisplayerPage from './containers/SingleTableDisplayerPage/SingleTableDisplayerPage';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './styles/styles.scss';

class App extends Component {
  render() {
    return (
      <div className="App">

      <Router>
        <Route exact path='/' component={TablesDisplayerPage}/>
        <Route path='/:table' component={SingleTableDisplayerPage}/>
      </Router>
      </div>
    );
  }
}

export default App;
