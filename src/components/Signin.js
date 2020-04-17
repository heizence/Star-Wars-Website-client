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

  fetchSignin = (email, password) => {
    let reqBody = { email: email, password: password }
    fetch(`${serverAddress}/user/signin`, 
    { 
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
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
        this.props.onRequestSignin(data[0].username)
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
            <h1 className="titleCaption">SIGN IN</h1>
            <Form>
              <FormGroup row>
                <Label className="signin-label" for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="email" name="email" 
                  id="exampleEmail" placeholder="email"
                  onChange={(e) => this.setState({ email: e.target.value})} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  id="examplePassword" placeholder="password"
                  onChange={(e) => this.setState({ password: e.target.value})} />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button id="signin-button" onClick={() => this.fetchSignin(this.state.email, this.state.password)}>Sign in</Button>
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
