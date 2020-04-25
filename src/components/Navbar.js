import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { serverAddress } from '../serverAddress'

// Signout request
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
  // Reset SearchField text to prevent filter error when redirecting
  const resetSearchText = () => {
    props.onSearchData('')
  }
  
  console.log('sessionToken : ', sessionStorage)
  
  return (
    <div id="navbar">
    <Link to={'/'}>
      <img id="main-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png" 
      width="200px" heigh="40" alt="" 
      onClick={resetSearchText}></img>      
      </Link>
        <div id='navbar-text'>        
        <ul>
          {sessionStorage.token ? // if logged in
            <li style={{color: 'yellow'}}
            onClick={resetSearchText}
            ><Link to={'/mypage'}>My page</Link></li> : ''
          }
          {sessionStorage.token ?  // if logged in
          <li onClick={() => {
            fetchSignout(props)
            resetSearchText()
          }}>Sign out</li> :
          <li onClick={resetSearchText}><Link to={'/signin'}>Sign in</Link></li>
          }          
          <li onClick={resetSearchText}><Link to={'/'}>Home</Link></li>
          <li onClick={resetSearchText}><Link to={'/board'}>Board</Link></li>         
        </ul>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
