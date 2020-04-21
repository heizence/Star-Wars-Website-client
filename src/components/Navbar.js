import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { serverAddress } from '../serverAddress'

const fetchSignout = (props) => {
  console.log('fetchsignout executed')
  fetch(`${serverAddress}/user/signout?token=${sessionStorage.getItem('token')}`)
  .then(res => {
    window.alert('Logged out!')
    props.onRequestSignout()
  })
  .catch(error => {
    window.alert('Error occured! Please try again later.')
    console.log(error)
  })
}

const NavigationBar = (props) => {
  return (
    <div id="navbar">
    <Link to={'/'}>
      <img id="main-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png" 
      width="200px" heigh="40" alt="" ></img>      
      </Link>
        <div id='navbar-text'>        
        <ul>
          {sessionStorage.length > 0 ? // Login status
            <li style={{color: 'yellow'}}><Link to={'/mypage'}>My page</Link></li> : ''
          }
          {sessionStorage.length > 0 ?  // Login status  
          <li onClick={() => fetchSignout(props)}>Sign out</li> :
          <li><Link to={'/signin'}>Sign in</Link></li>
          }          
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/board'}>Board</Link></li>         
        </ul>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
