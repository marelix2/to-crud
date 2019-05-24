import React, { Component } from 'react';
import TablesDisplayerPage from './containers/TablesDisplayerPage/TablesDisplayerPage';
import SingleTableDisplayerPage from './containers/SingleTableDisplayerPage/SingleTableDisplayerPage';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import EditRowPage from './containers/EditRowPage/EditRowPage';

import './styles/styles.scss';
class App extends Component {
  render() {
    return (
      <div className="App">

      <Router>
        <Switch>
        <Route exact path='/' component={TablesDisplayerPage}/>
        <Route path='/row' component={EditRowPage}/>
        <Route path='/:table' component={SingleTableDisplayerPage}/>
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
