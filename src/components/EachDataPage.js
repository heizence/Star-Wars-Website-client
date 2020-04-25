import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'
import RenderImage from './RenderImage'
import { renderTextData, renderRelationalData } from './RenderText'

class eachDataPage extends Component {
    componentDidMount() {
        this.props.onRequestPageMove(window.location.href)  // Save current page URL
        console.log('sessionToken : ', sessionStorage)
        
        // When refreshing browser
        if (!this.props[this.props.match.category]) {
            this.props.onRequestData(this.props.match.category)
        }
    }
    
    render() {
        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        let name = this.props.match.name.split('+').join(' ').split('&').join('/')
        let { category } = this.props.match

        // Data filtering
        let dataToRender
        if (this.props[category]) {
            dataToRender = this.props[category].filter(element => {
                return element.name === name || element.title === name
            })[0]
            console.log('data to render : ', dataToRender)
        }

        return (
            <div className="main">
            <Navbar />
            <div style={{minHeight: '80vh'}}>
                <div style={{paddingTop: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{name}</h1>   
                    
                    <GoBackButton text="Go Back to category" category={category} 
                    index={dataToRender ? dataToRender.pageIndex : '1'} />
                    <div>
                        {!this.props.isPending && dataToRender ? 
                            <div>
                        <div className="contents-box">
                           
                        <RenderImage imagefile={dataToRender["imagefile"]} />
                            <div className="contents-textbox">{renderTextData(dataToRender)}</div>
                        </div>
                        <div className="contents-relationalBox">{renderRelationalData(dataToRender, this.movePage)}</div>
                        </div>
                        : <div style={{
                            color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                        }}>{this.props.error ? 'Error! Please try again later' : 'Loading...'}</div>
                        }       
                    </div>
                </div>
                </div>

                <InfoCaption />
            </div>            
        )        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(eachDataPage);
