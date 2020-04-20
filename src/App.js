import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage'
import CategoryPage from './components/CategoryPage'
import EachDataPage from './components/EachDataPage'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Mypage from './components/Mypage'
import MembershipWithdraw from './components/MembershipWithdraw'

function App() {
  return (
    <div>
      <Route path="/" exact component={MainPage}/>
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/mypage" exact component={Mypage} />
      <Route path="/withdraw" exact component={MembershipWithdraw} />
      <Route path="/category/:category" exact render={({ match, location }) => <CategoryPage category={match.params.category} location={location}/>} />
      <Route path="/category/:category/:name" exact render={({ match, location }) => <EachDataPage match={match.params} location={location}/>} />      
    </div>
  );
}

// This is for test!

// function App() {
//   return (
//     <div>
//       <MembershipWithdraw />     
//     </div>
//   );
// }

export default App;
