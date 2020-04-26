import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isLoggedIn: sessionStorage.length
    }
  }

  fetchSignin = () => {
    if (this.state.email === '') {
      window.alert('Enter your Email address.')
      return
    }
    else if (this.state.password === '') {
      window.alert('Enter your password.')
      return
    }
    else {
      let emailArr = this.state.email.split('')
      if (!emailArr.includes('@') || !emailArr.includes('.')) {
        window.alert('Incorrect Email form! Please enter your correct Email address.')
        return
      }
    }
    
    let reqBody = { email: this.state.email, password: this.state.password }

    fetch(`${serverAddress}/user/signin`, 
    { 
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(reqBody)      
    })
    .then(res => res.json())
    .then(user => {
      if (!user) {
        window.alert('No matching user. Check your Email address and password.')
      }
      else if (user.token) {
        window.alert('Logged in!')
        this.props.onRequestSignin(user)
      }
    })
    .catch(error => {
      window.alert('Error occured! Please try again later.')
      console.log(error)
    })
  }

  // automatically log in when press Enter key in a password form.
  pressEnter = (e, callback) => {
    if (e.keyCode === 13) {
      callback()
    }
  }

  render() {
    if (sessionStorage.token) {  // if logged in
      let directionPath = sessionStorage.getItem('currentPage')
      // To prevent bug when currentPage URL is null
      return <Redirect to={directionPath ? `/${sessionStorage.getItem('currentPage')}` : '/'} />
    }
    else {
      return (
        <div className="main" >
          <Navbar />
          <div style={{paddingTop: '50px', minHeight: '70vh'}}>
            <h1 className="titleCaption">SIGN IN</h1>
            <Form>
              <FormGroup row>
                <Label className="signin-label" for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="email" name="email" 
                  placeholder="email" autoComplete="off"
                  onChange={(e) => this.setState({ email: e.target.value})} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  placeholder="password" autoComplete="off"
                  onChange={(e) => this.setState({ password: e.target.value})}
                  onKeyUp={(e) => this.pressEnter(e, this.fetchSignin)} />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button className="userform-button" onClick={() => this.fetchSignin()}>Sign in</Button>
                </Col>
              </FormGroup>
            </Form>

            <div style={{marginTop: "50px"}}> 
              <div className="signin-text">Not a member? 
              <Link to={"/signup"} style={{marginLeft: "20px", color: 'yellow'}}>Sign up</Link>
              </div>
            </div>
                        
            </div>
          <InfoCaption />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
