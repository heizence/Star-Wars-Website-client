import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestData, requestSearch, requestAllURL } from '../reduxFiles/actionCreators'
import { Link } from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data,
        isPending: state.fetchData.isPending,
        error: state.fetchData.error,
        text: state.searchData.text,
        allURL: state.fetchAllURL.url
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category) => dispatch(requestData(category)),
        onSearchData: (text) => requestSearch(dispatch, text),
        onRequestAllURL: () => requestAllURL(dispatch)
    }
}

class categoryPage extends Component {
    componentDidMount() {
        this.props.onRequestData(this.props.category)
        //this.props.onRequestAllURL(this.props.category)
        
    }
    render() {        
        let category = this.props.category
        let data = this.props.data
        //console.log('Category : ', category)
        //console.log('Data fetched : ', data)
        //console.log('All URL fetched : ', this.props.allURL)
        
        return (   
            <div className="main">
                <div style={{paddingTop: '50px'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
                    width="400" alt=""></img>
                    <h1 style={{color: 'white'}}>{category.toUpperCase()}</h1>
                    <h2 style={{color: 'white'}}>Search any {category} you'd like to find</h2>
                    <input style={{
                        width: '300px', height: '40px', fontSize: '25px',
                        borderRadius: '5px'
                    }}
                    onChange={(e) => {
                        console.log('redux text state check: ', this.props.text)
                        this.props.onSearchData(e.target.value)
                    }}/>
                </div>

                <div>                          
                {this.props.isPending ? 
                <div style={{
                    color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                }}>Loading...</div> :
                <div className="category-container">
                {data.map((element, index) => 
                    element.name ? 
                    <Link to={`${category}/${element.name.split('/').join('&')}`} key={index} style={{textDecoration: 'none', color: 'white'}}>
                        <div className="category-box" id={element} key={index}>
                            <div className="box-text">{element.name}</div>
                        </div>
                    </Link>
                    :
                    <Link to={`${category}/${element.title.toLowerCase().split(' ').join('')}`} key={index} style={{textDecoration: 'none', color: 'white'}}>
                        <div className="category-box" id={element} key={index}>
                            <div className="box-text">{element.title}</div>
                        </div>
                    </Link>
                )}
                </div>
                }  
                </div>      
                
                <div className="APIinfo">
                Informations are provided by Star Wars API. If you would like to know about Star Wars API, 
                visit <a href="https://swapi.co" target="blank">https://swapi.co</a>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);
