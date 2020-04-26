import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import RenderDataBox from './RenderDataBox'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'

class BoardPage extends Component {    
    componentDidMount() {
        console.log('sessionToken : ', sessionStorage)
    }

    render() {                
        return (   
            <div className="main">
            <Navbar />
            <div style={{minHeight: '85vh'}}>
                <div style={{paddingTop: '50px'}}>
                    <h1 style={{color: 'white'}}>BOARD</h1>
                    <h2 style={{color: 'white'}}>This is free board page.</h2>
                </div>   
            </div>  

            <InfoCaption />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
