import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestSignout } from '../reduxFiles/actionCreators'
import { serverAddress } from '../serverAddress'

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.handleUser.isLoggedIn,
      username: state.handleUser.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestSignout: () => requestSignout(dispatch)
  }
}

const fetchSignout = (props) => {
  console.log('fetchsignout executed')
  fetch(`${serverAddress}/user/signout`)
  .then(res => {
    console.log('res : ' , res)
    window.alert('Logged out!')
    props.onRequestSignout()
  })
  .catch(error => console.log(error))
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
          {props.isLoggedIn ?
            <li style={{color: 'yellow'}}><Link to={'/mypage'}>My page</Link></li> : ''
          }
          {props.isLoggedIn ?           
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
