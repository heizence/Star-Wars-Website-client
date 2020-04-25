import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'
import { serverAddress } from '../serverAddress'

class MembershipWithdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ''
    }
  }

  fetchDeleteAccount = () => {
    let password = this.state.password

    if (password === '') {
        window.alert(`Enter your password`)
        return
    }
    fetch(`${serverAddress}/user/deleteuser?password=${password}&token=${sessionStorage.getItem('token')}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        if (res.status === 200) {
            window.alert(`Membership withdrawed.`)  
            this.props.onRequestSignout()     
        }
        else if (res.status === 201) {
            window.alert(`Password incorrect!`)
        }
    })
    .catch(error => {
      window.alert('Error occured! Please try again later.')
      console.log(error)
    })
  }

  componentDidMount() {
    this.props.onRequestPageMove(window.location.href)  // Save current page URL
    console.log('sessionToken : ', sessionStorage)
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
            <h1 style={{color: 'white', padding: '0px 30px 0px 30px'}}>Membership Withdrawal</h1>
            <div style={{
              color: 'yellow', fontSize: '20px', 
              marginTop: '50px', marginBottom: '50px', 
              marginLeft: 'auto',
              marginRight: 'auto',
              width: ' 70%'
            }}>
              <div>You are going to delete your account. All your informations will be removed and cannot be recovered after withdrawal.</div>
              <div style={{marginTop: '30px'}}>If you want to proceed, enter your password and press withdrawal button or you can go back to Mypage.</div>
            </div>

            <Form>
              <FormGroup row>
                <Label className="signin-label" for="examplePassword" sm={2}>Confirm Password</Label>
                <Col sm={10}>
                  <Input className="signin-form" type="password" name="password" 
                  placeholder="password" autoComplete="off"
                  onChange={(e) => this.setState({ password: e.target.value})} />
                </Col>
              </FormGroup>
            </Form>

            <div style={{marginTop: '100px'}}>
                <Link to={'/mypage'}>
                <Button id="goback-button">Go back to My page</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MembershipWithdraw);
