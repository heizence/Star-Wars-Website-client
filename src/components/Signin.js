import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { requestSignin } from '../reduxFiles/actionCreators'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.handleUser.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestSignin: (username) => requestSignin(username, dispatch)
  }
}

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
    .then(data => {
      console.log(data)
      if (data.length === 0) {
        window.alert('No matching user.')
      }
      else {
        window.alert('Logged in!')
        console.log('user info : ', data[0])
        this.props.onRequestSignin(data[0])
      }
    })
    .catch(error => console.log(error))
  }

  pressEnter = (e, callback) => {
    if (e.keyCode === 13) {
      callback()
    }
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
            <h1 className="titleCaption">SIGN IN</h1>
            <Form>
              <FormGroup row>
                <Label className="signin-label" for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="email" name="email" 
                  id="exampleEmail" placeholder="email" autoComplete="off"
                  onChange={(e) => this.setState({ email: e.target.value})} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  id="examplePassword" placeholder="password" autoComplete="off"
                  onChange={(e) => this.setState({ password: e.target.value})}
                  onKeyUp={(e) => this.pressEnter(e, this.fetchSignin)} />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button id="signin-button" onClick={() => this.fetchSignin()}>Sign in</Button>
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
