import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestData, requestSearch } from '../reduxFiles/actionCreators'
import { Link } from 'react-router-dom'
import GoBackButton from './GoBackButton'

const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data,
        isPending: state.fetchData.isPending,
        error: state.fetchData.error,
        text: state.searchData.text
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category, index) => dispatch(requestData(category, index)),
        onSearchData: (text) => requestSearch(dispatch, text)
    }
}

class categoryPage extends Component {    
    constructor() {
        super()
        this.state ={
            pageMoved: false
        }
    }

    searchDataAndRender(text) {
        let data = this.props.data.filter(element => {
            let str = element.name || element.title
            let txt = new RegExp(text, "i")
            console.log('reg ignoreCase applied : ', txt.ignoreCase)
            return txt.test(str)
        })
        return data
    }

    renderPageButtons(category) {
        const numberOfPages = {
            people: 9,
            vehicles: 4,
            planets: 7,
            starships: 4,
            species: 4,
            films: 1
        }
    
        let pageIndex = this.props.location.search.split('=')[1]  
        let indexArr = []
       
        for (let i=1; i<=numberOfPages[category]; i++) {
            indexArr.push(i)
        }

        return (
            <div>
            {indexArr.map((element, index) => {
                if (element !== Number(pageIndex)) {
                    return (
                        <Link to={`${category}?page=${element}`} key={index}>
                            <button className='page-button' onClick={() => {
                                this.props.onRequestData(category, element)
                                this.props.onSearchData('')
                            }}>{element}</button>
                        </Link>
                    )
                }
                else if (element === Number(pageIndex)) {
                    return (                        
                        <button className='page-button-selected' key={index}>{element}</button>
                    )
                }
                return ''  // to prevent warning message
            })}
            </div>
        )
    }

    componentDidMount() {
        let index = this.props.location.search.split('=')[1]
        //console.log('index 확인(CategoryPage) : ', index)
        this.props.onRequestData(this.props.category, index)
    }

    render() {        
        let category = this.props.category
        let data
        if (this.props.text) {
            data = this.searchDataAndRender(this.props.text)
        } 
        else {
            data = this.props.data
        } 

        //console.log('Category 확인(CategoryPage) : ', category)
        //console.log('Redux State Data(CategoryPage) : ', this.props.data)
        
        return (   
            <div className="main">
            
            <div style={{minHeight: '85vh'}}>
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
                    <GoBackButton text='Go back to Main'/>
                </div>

                <div>                          
                    {this.props.isPending ? 
                    <div style={{
                        color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                    }}>{this.props.error ? "Error! Please try later" : "Loading..."}</div> :
                    
                    <div>
                        <div className="category-container">
                        {data.map((element, index) =>                                     
                            element.name ? 
                            <Link to={`${category}/${element.name.split('/').join('&')}?index=${element.url.split('/')[5]}&categorypageindex=${this.props.location.search.split('=')[1]}`} 
                            key={index} style={{textDecoration: 'none', color: 'white'}}>
                                <div className="category-box" id={element} key={index} onClick={() => {
                                    this.props.onSearchData('')
                                }}>
                                    <div className="box-text">{element.name}</div>
                                </div>
                            </Link>
                            :
                            <Link to={`${category}/${element.title}?index=${element.url.split('/')[5]}&categorypageindex=${this.props.location.search.split('=')[1]}`} 
                            key={index} style={{textDecoration: 'none', color: 'white'}}>
                                <div className="category-box" id={element} key={index} onClick={() => {
                                    this.props.onSearchData('')
                                }}>
                                    <div className="box-text">{element.title}</div>
                                </div>
                            </Link>
                        )}                    
                        </div>
                        
                        <div style={{marginTop: '50px'}}>
                        <h2 style={{color: 'white'}}>Pages</h2>
                        {this.renderPageButtons(category)}
                        </div>
                    </div>
                    }  
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

export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);
