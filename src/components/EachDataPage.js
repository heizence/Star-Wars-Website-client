import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestData, requestAllURL } from '../reduxFiles/actionCreators'
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data,
        isPending: state.fetchData.isPending,
        error: state.fetchData.error,

        allURL: state.fetchAllURL.url,
        isURLPending: state.fetchAllURL.isPending,
        URLerror: state.fetchAllURL.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category) => dispatch(requestData(category)),
        onRequestAllURL: () => requestAllURL(dispatch)
    }
}

class eachDataPage extends Component {
    constructor() {
        super()

        this.state = {
            dataToRender: [],
            isPending: true
        }
    }

    composeData = (data, name) => {
        let object = data.filter((element) => {
            return (element.name === name || element.title === name) 
        })[0]
        //console.log('composeData 확인 : ', object)

        let output = []

        for (let i in object) {
            if (object[i].slice(0, 5) === 'https') {
                axios.get(`${object[i]}?format=json`)
                .then(res => {
                    //console.log(res.data.name || res.data.title)
                    output.push({ [i] : res.data.name || res.data.title })
                })
            }
            else {
                output.push({ [i]: object[i]})
            }
        }
        //console.log(output)
        
    }

    filterData = (data, name) => {
        return data.filter((element) => {
            return (element.name === name || element.title === name) 
        })
    }
    
    renderText = (str) => {
        let urlData = this.props.allURL
        // console.log('renderText 확인 : ', str)
        if (str.slice(0, 5) === 'https') {
            //console.log('renderText 확인 : ', urlData, str)            
            let category = str.split('/')[4]
            console.log('category 확인 : ', category)
            console.log('renderText 확인 : ', urlData[category][str])
            return urlData[category][str]
        }
        else {            
            //console.log('renderText 확인 : ', str)
            return str
        }        
    }
    
    renderData = (object) => {        
        return Object.keys(object).map((key, index) => {
            console.log('key : ',key,',', object[key].slice(0, 5))
            if (Array.isArray(object[key])) {
                return (
                    <div key={index}>{key} :
                    {object[key].map((element, index2) => {
                        //console.log('renderText 실행 : ', this.renderText(element))
                        return (
                        <div key={index2} className="contents-tag">{this.renderText(element)}</div>
                        )
                    })}
                    </div>
                )
            }
            else {
                return (
                <div key={index} className="contents-tag">{key} : {this.renderText(object[key])}</div>
                )
            }
        })
    }

    componentDidMount() {
        this.props.onRequestData(this.props.match.category)
        this.props.onRequestAllURL(this.props.category)
    }
    
    render() {
        // in case there is '/' in a name   ex) TIE/LN starfighter
        let info = this.props.match.info.split('&').join('/')
        let filteredData = this.filterData(this.props.data, info)
        //this.composeData(this.props.data, info)
        //console.log('match 확인 : ', this.props.match)
        //console.log('데이터 확인 : ', this.props.data)
        //console.log('걸러진 데이터 확인 : ', filteredData[0])
        //console.log('state 확인 : ', this.state.dataToRender)
        //console.log('URL 확인 : ', this.props.allURL)
        return (
            <div className="main">
                <div style={{paddingTop: '50px'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
                    width="400" alt=""></img>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{info}</h1>   
                    <div>
                    <div className="contents-box">
                        {filteredData[0] ?                             
                            this.renderData(filteredData[0]) :
                            <div>Loading...</div>
                        }
                    </div>   
                    </div>          
                </div>

                <div className="APIinfo">
                Informations are provided by Star Wars API. If you would like to know about Star Wars API, 
                visit <a href="https://swapi.co" target="blank">https://swapi.co</a>
                </div>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(eachDataPage);
