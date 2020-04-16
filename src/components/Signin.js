import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import '../App.css';

const Example = (props) => {
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
              id="exampleEmail" placeholder="email" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="signin-label" for="examplePassword" sm={2}>Password</Label>
            <Col sm={10}>
              <Input className="signin-form" type="password" name="password" 
              id="examplePassword" placeholder="password" />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button id="signin-button">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>

        <div style={{marginTop: "50px"}}>        
          <div className="signin-text">Forgot password? 
          <span style={{marginLeft: "20px", color: 'yellow'}}>Find password</span>
          </div>
          <div className="signin-text">Not a member? 
          <a href="/signup" style={{marginLeft: "20px", color: 'yellow'}}>Sign up</a>
          </div>
        </div>
                    
        </div>
      <InfoCaption />
    </div>
    
  );
}

export default Example;
