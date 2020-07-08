import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import List from './components/List'

const App = () => {

  return (
    <BrowserRouter>
        <Route exact path="/" render={(routerProps) => <List {...routerProps} /> }/>
     </BrowserRouter>
  );
}

export default App;
