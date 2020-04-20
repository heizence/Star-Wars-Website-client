import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordCheck: '',
      username: '',

      emailConfirmed: false,
      usernameConfirmed: false,         
      signedUp: false
    }
  }

  checkUserInfo = (category, subject) => {
    let reqBody = { category, subject }
    if (subject === '') {
        window.alert(`Enter your ${category}`)
        return
    }
    
    fetch(`${serverAddress}/user/checkuserinfo`, 
    { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)      
    })
    .then(res => {
        if (res.status === 201) {
            window.alert(`${category} already exists.`)   
            category === 'email' ? this.setState({ emailConfirmed: false })
            : this.setState({ usernameConfirmed: false })         
        }
        else if (res.status === 200) {
            window.alert(`${category} available.`)
            category === 'email' ? this.setState({ emailConfirmed: true })
            : this.setState({ usernameConfirmed: true })
        }
    })
    .catch(error => {
      window.alert('Error occured! Please try again later.')
      console.log(error)
    })
  }

  fetchSignup = () => {
    let { emailConfirmed, usernameConfirmed, password, passwordCheck } = this.state

    if (!emailConfirmed) {
        window.alert('Please check your email.')
        return
    }
    else if (!usernameConfirmed) {
        window.alert('Please check your username.')
        return
    }
    else if (!password) {
        window.alert('Please enter your password.')
        return
    }
    else if (password !== passwordCheck) {
        window.alert('Password does not match.')
        return
    }

    let reqBody = { 
        email: this.state.email, 
        password: this.state.password, 
        username: this.state.username
    }

    fetch(`${serverAddress}/user/signup`, 
    { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)      
    })
    .then(res => {
      console.log('res : ' , res)
      if (res.status === 200) {        
        window.alert('Signed Up!')
        this.setState({ signedUp: true })    
      }
    })
    .catch(error => {
      window.alert('Error occured! Please try again later.')
      console.log(error)      
    })
  }

  render() {
    if (this.state.signedUp) {
      return <Redirect to='/' />
    }
    else {
      return (
        <div className="main" >
          <Navbar />
          <div style={{paddingTop: '50px', minHeight: '70vh'}}>
            <h1 className="titleCaption">SIGN UP</h1>
            <Form style={{textAlign: "left", width: '50%', maxWidth: '500px', margin: 'auto'}}>
              <FormGroup row>
                <Label className="signin-label" for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="email" name="email" 
                  placeholder="email" autoComplete="off"                  
                  onChange={(e) => this.setState({ email: e.target.value })} />
                  <Button className="userform-button" style={{marginLeft: '30px'}}
                  onClick={() => this.checkUserInfo('email', this.state.email)}>Check</Button>
                </Col>
              </FormGroup>              
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Username</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="text" name="username" 
                  placeholder="username" autoComplete="off"
                  onChange={(e) => this.setState({ username : e.target.value})} />
                  <Button className="userform-button" style={{marginLeft: '30px'}}
                  onClick={() => this.checkUserInfo('username', this.state.username)}>Check</Button>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  placeholder="password" autoComplete="off"
                  onChange={(e) => this.setState({ password: e.target.value })} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Check Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  placeholder="password" autoComplete="off"
                  onChange={(e) => this.setState({ passwordCheck: e.target.value})} />
                </Col>
              </FormGroup>

              <div style={{
                width: '300px', height: '40px', textAlign: 'left', fontSize: '20px',
                color: 'white',
                textShadow: this.state.password === this.state.passwordCheck ? 
                '-1px 0 blue, 0 1px blue, 1px 0 blue, 0 -1px blue' :
                '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red'
                }}>
                {this.state.password !== '' & this.state.passwordCheck !== '' ? this.state.password === this.state.passwordCheck ? 
                'Password match' : 'Password does not match' : ''}
              </div>

              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button className="userform-button" onClick={this.fetchSignup}>Sign up</Button>
                </Col>
              </FormGroup>
            </Form>
                        
            </div>
          <InfoCaption />
        </div>
      );
    }
  }
}

export default Signup;
