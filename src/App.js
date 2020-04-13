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
      <Route path="/:category/" exact render={({ match, location }) => <CategoryPage category={match.params.category} location={location}/>} />
      <Route path="/:category/:name" exact render={({ match, location }) => <EachDataPage match={match.params} location={location}/>} />
    </div>
  );
}

export default App;
