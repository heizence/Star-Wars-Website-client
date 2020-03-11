import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage'
import CategoryPage from './components/CategoryPage'
import EachDataPage from './components/EachDataPage'

function App() {
  return (
    <div>
      <Route path="/" exact component={MainPage}/>
      <Route path="/:category" exact render={({ match }) => <CategoryPage category={match.params.category}/>} />
      <Route path="/:category/:info" exact render={({ match }) => <EachDataPage match={match.params}/>} />
    </div>
  );
}

export default App;
