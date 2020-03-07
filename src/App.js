import React from 'react';
import { Route, Link, Switch} from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage'
import CategoryPage from './components/CategoryPage'
import InformationPage from './components/InformationPage'

function App() {
  return (
    <div>
      <Route path="/" exact component={MainPage}/>
      <Route path="/:category" exact render={({ match }) => <CategoryPage category={match.params.category}/>} />
      <Route path="/:category/info" exact component={InformationPage} />
    </div>
  );
}

export default App;
