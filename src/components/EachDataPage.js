import React, { Component } from 'react';
import GoBackButton from './GoBackButton'

class eachDataPage extends Component {
    constructor() {
        super()

        this.state = {
            data: undefined,
            error: false
        }
    }
    
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
        //let index = this.props.location.search.split('=')[1]
        let indexArr = this.props.location.search.split('&')

        let eachDataIndex = indexArr[0].split('=')[1]
        //let categoryPageIndex = indexArr[1].split('=')[1]

        let match = this.props.match

        //console.log('category 확인(EachDataPage) : ', match, this.props.location)
        //console.log('index 확인(EachDataPage) : ', eachDataIndex, categoryPageIndex)

        fetch(`https://swapi.co/api/${match.category}/${eachDataIndex}/?format=json`)
        .then(res => res.json())
        .then(json => {      
            console.log(json)      
            this.setState({ data: json })
        })
        .catch(err => {
            console.log(err)
            this.setState({ error: true })
        })   
    }
    
    render() {
        // in case there is '/' in a name   ex) TIE/LN starfighter
        let info = this.props.match.info.split('&').join('/')
        let dataToRender = this.state.data

        let indexArr = this.props.location.search.split('&')
        let categoryPageIndex = indexArr[1].split('=')[1]
        
        return (
            <div className="main">
            <div style={{minHeight: '80vh'}}>
                <div style={{paddingTop: '50px'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
                    width="400" alt=""></img>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{info}</h1>   
                    <GoBackButton text="Go Back to category" address={this.props.match.category} index={categoryPageIndex}/>
                    <div>
                        {dataToRender ? 
                        <div className="contents-box">                    
                            <div>{this.renderData(dataToRender)}</div>
                        </div> :
                        <div style={{
                            color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                        }}>{this.state.error ? 'Error! Please try later' : 'Loading...'}</div>
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
