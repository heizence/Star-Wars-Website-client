import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

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

  changeUsername = async () => {
    if (this.state.newUsername === '') {
        window.alert('Enter a new username.')
    }
    else {
      try {
        let res = await  fetch(`${serverAddress}/user/checkuserinfo`, 
        { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ category: 'username', subject: this.state.newUsername })      
        })

        if (res.status === 201) {
          window.alert(`username already exists.`)         
        }
        else if (res.status === 200) {
            this.fetchModify(this.state.newUsername, null)
        }
      }
      catch(error) {
        window.alert('Error occured! Please try again later.')
        console.log(error)
      }
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
    let reqBody = { newUsername, newPassword, token: sessionStorage.getItem('token') }

    fetch(`${serverAddress}/user/updateuser`, 
    { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)      
    })
    .then(res => {
        if (res.status === 200) {
          newUsername ? window.alert(`Username has been modified.`)
          : window.alert(`Password has been modified.`)
        }
    })
    .catch(error => {
      window.alert('Error occured! Please try again later.')
      console.log(error)
    })
  }

  render() {
    if (sessionStorage.length === 0) {  // if not logged in
      return <Redirect to='/' />
    }
    else {
      return (
        <div className="main" >
          <Navbar />
          <div style={{paddingTop: '50px', minHeight: '70vh'}}>
            <h1 className="titleCaption">MY PAGE</h1>
            <div style={{textAlign: "left", width: '40%', maxWidth: '500px', margin: 'auto'}}>
                <div className="mypage-text">Email : {this.props.user.email}</div>
                <div className="mypage-text">Username : {this.props.user.username}</div>
                <div style={{marginTop: '50px'}}>
                    <div className="mypage-text" style={{fontSize: '17px', color: 'yellow'}}>
                    <span>* You don't have to fill all blanks.</span>
                    <div>If you don't want to change some informations, leave it empty.</div>
                    </div>

                    <div style={{color: 'white', fontSize: '20px'}}>Change Username</div>
                    <Input className="signin-form" type="text" name="username" 
                    id="exampleEmail" placeholder="new username" autoComplete="off"                  
                    onChange={(e) => this.setState({ newUsername: e.target.value })} />
                    <div>
                        <Button className="userform-button" 
                        style={{marginLeft: '10px', width: '130px', height: '60px', marginBottom: '20px'}}
                        onClick={() => this.changeUsername()}>Change Username
                        </Button>
                    </div>
                </div>

                <div style={{marginTop: '20px'}}>
                    <div style={{color: 'white', fontSize: '20px'}}>Change Password</div>
                    <Input className="signin-form" type="password" name="password" 
                    placeholder="new password" autoComplete="off"                  
                    onChange={(e) => this.setState({ newPassword: e.target.value })} />
                    
                </div>

                <div style={{marginTop: '20px'}}>
                    <div style={{color: 'white', fontSize: '20px'}}>Confirm Password</div>
                    <Input className="signin-form" type="password" name="password" 
                    placeholder="password" autoComplete="off"
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
                    <Button className="userform-button" 
                    style={{marginLeft: '10px', width: '130px', height: '60px'}}
                    onClick={() => this.changePassword()}>Change Password
                    </Button>
                </div>                
                                        
            </div>

            <div style={{marginTop: '100px'}}>
                <Link to={'/'}>
                <Button id="goback-button">Go back to main page</Button>
                </Link>

                <Link to={'/withdraw'}>
                <Button id="withdrawal-button" 
                onClick={this.fetchDeleteAccount}>Membership Withdrawal</Button>
                </Link>
            </div>
            
            </div>
          <InfoCaption />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
