import React, { Component } from 'react';
import GoBackButton from './GoBackButton'
import { serverAddress } from '../serverAddress'

class eachDataPage extends Component {
    constructor() {
        super()

        this.state = {
            data: undefined,
            isPending: true
        }
    }
    
    renderData = (object) => {        
        return Object.keys(object).map((key, index) => {
            if (Array.isArray(object[key])) {
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
                <div key={index} className="contents-tag">{key} : {object[key]}</div>
                )
            }
        })
    }

    componentDidMount() {
        fetch(`${serverAddress}/get/eachdata?category=${this.props.match.category}&name=${this.props.match.info}`)
        .then(res => res.json())
        .then(json => {            
            this.setState({ data: json})
        })
        .catch(err => console.log(err))
    }
    
    render() {
        // in case there is '/' in a name   ex) TIE/LN starfighter
        console.log('match 확인 : ', this.props.match)
        let info = this.props.match.info.split('&').join('/')
        console.log('state 데이터 확인 : ' , this.state.data)
        let dataToRender = this.state.data
        
        return (
            <div className="main">
            <div style={{minHeight: '85vh'}}>
                <div style={{paddingTop: '50px'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
                    width="400" alt=""></img>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{info}</h1>   
                    <GoBackButton text="Go Back to category" address={this.props.match.category}/>
                    <div>
                        {dataToRender ? 
                        <div className="contents-box">                    
                            <div>{this.renderData(dataToRender)}</div>
                        </div> :
                        <div style={{
                            color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                        }}>Loading...</div>
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

export default eachDataPage;
