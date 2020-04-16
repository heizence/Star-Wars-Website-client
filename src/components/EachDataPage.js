import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoBackButton from './GoBackButton'
import { requestData } from '../reduxFiles/actionCreators'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'

const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data,
        isPending: state.fetchData.isPending,
        error: state.fetchData.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category, method, name) => dispatch(requestData(category, method, name))
    }
}

class eachDataPage extends Component {

    renderData = (object) => {        
        return Object.keys(object).map((key, index) => {
            if (Array.isArray(object[key])) {
                if (object[key].length > 0) {
                    return (
                        <div key={index}>{key} :
                        {object[key].map((element, index2) => {
                            return (
                            <div key={index2} className="contents-tag">{element}</div>
                            )
                        })}
                        </div>
                    )
                }
                else {
                    return (
                    <div key={index} className="contents-tag">{key} : none</div>
                    )
                }
            }
            else {
                return (
                <div key={index} className="contents-tag">{key} : {object[key]}</div>
                )
            }
        })
    }

    componentDidMount() {
        let { category, name } = this.props.match

        // In case there are names which include '/'. For example : TIE/LN starfighter
        name = name.split('&').join('/')    
        //console.log('match/location 확인(EachDataPage) : ', this.props.match, this.props.location)
        this.props.onRequestData(category, 'getdata', name)
    }
    
    render() {
        // In case there are names which include '/'. For example : TIE/LN starfighter
        let name = this.props.match.name.split('&').join('/')
        let dataToRender = this.props.data
        let pageIndex = this.props.location.search.split('=')[1]
        
        //console.log('data 확인(EachDataPage) : ', this.props.data)
        //console.log('pageIndex(EachDataPage) : ', pageIndex)
        return (
            <div className="main">
            <Navbar />
            <div style={{minHeight: '80vh'}}>
                <div style={{paddingTop: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{name}</h1>   
                    <GoBackButton text="Go Back to category" address={this.props.match.category} index={pageIndex} 
                    onClick={() => this.props.onRequestData(this.props.match.category, 'getnames')}/>
                    <div>
                        {!this.props.isPending ? 
                        <div className="contents-box">                    
                            <div>{this.renderData(dataToRender)}</div>
                        </div> :
                        <div style={{
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
