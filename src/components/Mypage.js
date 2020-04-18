import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { requestSignout } from '../reduxFiles/actionCreators'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.handleUser.isLoggedIn,
        userObj: state.handleUser.userObj
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        onRequestSignout: () => requestSignout(dispatch)
    }
}

class Mypage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUsername: '',
      usernameConfirmed: false,  
      newPassword: '',
      newPasswordCheck: ''
    }
  }

  changeUsername = () => {
    if (this.state.newUsername === '') {
        window.alert('Enter a new username.')
    }
    else {
        this.fetchModify(this.state.newUsername, null)
    }
  }

  changePassword = () => {
      if (this.state.newPassword === '' || this.state.newPasswordCheck === '') {
          window.alert('Check your password.')
      }
      else if (this.state.newPassword !== this.state.newPasswordCheck) {
          window.alert('Password does not match.')
      }
      else {
          this.fetchModify(null, this.state.newPassword)
      }
  }

  fetchModify = (newUsername, newPassword) => {
    let reqBody = { newUsername, newPassword }

    fetch(`${serverAddress}/user/updateuser`, 
    { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)      
    })
    .then(res => {
        if (res.status === 200) {
            window.alert(`User information has been modified.`)
        }
    })
    .catch(error => console.log(error))
  }

  fetchDeleteAccount = () => {
    let password = window.prompt(`You are going to delete your account. If you want to proceed, enter your password and press OK.`)

    if (password === '') {
        window.alert(`Enter your password`)
        return
    }
    fetch(`${serverAddress}/user/deleteuser?password=${password}`)
    .then(res => {
        if (res.status === 200) {
            window.alert(`User account has been deleted.`)  
            this.props.onRequestSignout()     
        }
        else if (res.status === 201) {
            window.alert(`Password incorrect!`)
        }
    })
    .catch(error => console.log(error))
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/' />
    }
    else {
      return (
        <div className="main" >
          <Navbar />
          <div style={{paddingTop: '50px', minHeight: '70vh'}}>
            <h1 className="titleCaption">MY PAGE</h1>
            <div style={{textAlign: "left", width: '40%', maxWidth: '500px', margin: 'auto'}}>
                <div className="mypage-text">Email : test@test.com</div>
                <div className="mypage-text">Username : username!</div>
                <div style={{marginTop: '50px'}}>
                    <div className="mypage-text" style={{fontSize: '17px', color: 'yellow'}}>
                    <span>* You don't have to fill all blanks.</span>
                    <div>If you don't want to change some informations, leave it empty.</div>
                    </div>

                    <div style={{color: 'white', fontSize: '20px'}}>Change Username</div>
                    <Input className="signin-form" type="text" name="username" 
                    id="exampleEmail" placeholder="new username" autocomplete="off"                  
                    onChange={(e) => this.setState({ newUsername: e.target.value })} />
                    <div>
                        <Button id="signin-button" 
                        style={{marginLeft: '10px', width: '130px', height: '60px', marginBottom: '20px'}}
                        onClick={() => this.changeUsername()}>Change Username
                        </Button>
                    </div>
                </div>

                <div style={{marginTop: '20px'}}>
                    <div style={{color: 'white', fontSize: '20px'}}>Change Password</div>
                    <Input className="signin-form" type="password" name="password" 
                    id="exampleEmail" placeholder="new password" autocomplete="off"                  
                    onChange={(e) => this.setState({ newPassword: e.target.value })} />
                    
                </div>

                <div style={{marginTop: '20px'}}>
                    <div style={{color: 'white', fontSize: '20px'}}>Confirm Password</div>
                    <Input className="signin-form" type="password" name="password" 
                    id="examplePassword" placeholder="password" autocomplete="off"
                    onChange={(e) => this.setState({ newPasswordCheck: e.target.value})} />
                </div>

                <div style={{
                    width: '300px', height: '40px', textAlign: 'left', fontSize: '20px',
                    color: 'white',
                    textShadow: this.state.newPassword === this.state.newPasswordCheck ? 
                    '-1px 0 blue, 0 1px blue, 1px 0 blue, 0 -1px blue' :
                    '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red'
                    }}>
                    {this.state.newPassword !== '' & this.state.newPasswordCheck !== '' 
                    ? this.state.newPassword === this.state.newPasswordCheck ? 
                    'Password match' : 'Password does not match' : ''}
                </div>

                <div>
                    <Button id="signin-button" 
                    style={{marginLeft: '10px', width: '130px', height: '60px'}}
                    onClick={() => this.changePassword()}>Change Password
                    </Button>
                </div>                
                                        
            </div>

            <div style={{marginTop: '100px'}}>
                <Link to={'/'}>
                <Button id="goback-button">Go back to main page</Button>
                </Link>

                <Button id="withdrawal-button" 
                onClick={this.fetchDeleteAccount}>Membership Withdrawal</Button>
            </div>
            
            </div>
          <InfoCaption />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
