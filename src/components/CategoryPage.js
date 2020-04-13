import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestData, requestSearch } from '../reduxFiles/actionCreators'
import { Link } from 'react-router-dom'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'

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
        onRequestData: (category, method) => dispatch(requestData(category, method)),
        onSearchData: (text) => requestSearch(dispatch, text)
    }
}

class categoryPage extends Component {    
    // constructor() {
    //     super()
    //     this.state ={
    //         pageMoved: false
    //     }
    // }

    searchDataAndRender(text) {
        let data = this.props.data.filter(element => {
            let str = element
            let txt = new RegExp(text, "i")
            //console.log('reg ignoreCase applied : ', txt.ignoreCase)
            return txt.test(str)
        })
        return data
    }

    renderPageButtons(category) {
        const numberOfPages = this.props.data.length
    
        let pageIndex = this.props.location.search.split('=')[1]  
        let indexArr = []
        
        // Render 12 items per a page
        for (let i=1; i<=Math.round(numberOfPages/12); i++) {
            indexArr.push(i)
        }

        return (
            <div>
            {indexArr.map((element, index) => {
                if (element !== Number(pageIndex)) {
                    return (
                        <Link to={`${category}?page=${element}`} key={index}>
                            <button className='page-button' onClick={() => {
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
                return ''  // To prevent warning message
            })}
            </div>
        )
    }

    componentDidMount() {
        //console.log('index 확인(CategoryPage) : ', index)
        //console.log('category 확인(CategoryPage) : ', this.props.category)
        this.props.onRequestData(this.props.category, 'getnames')
    }

    render() {        
        console.log('data 확인(categoryPage) : ' ,this.props.data)

        let pageIndex = this.props.location.search.split('=')[1]
        let category = this.props.category
        let data
        
        if (this.props.text) {
            data = this.searchDataAndRender(this.props.text)
        } 
        // Set index only data type is Array, especially moved back from EachDataPage. 
        else if (Array.isArray(this.props.data)) {
            // Render 12 items per a page
            let startIndex = (pageIndex-1) * 12
            let endIndex = pageIndex * 12
            data = this.props.data.slice(startIndex, endIndex)
        } 
        
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
                        this.props.onSearchData(e.target.value)
                    }}/>
                    <GoBackButton text='Go back to Main'/>
                </div>

                <div>                          
                    {this.props.isPending ? 
                    <div style={{
                        color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                    }}>{this.props.error ? "Error! Please try again later" : "Loading..."}</div> :
                    
                    <div>
                        <div className="category-container">
                        {data.map((element, index) =>  
                            <Link to={`${category}/${element.split('/').join('&')}?categorypage=${pageIndex}`} 
                            key={index} style={{textDecoration: 'none', color: 'white'}}>
                                <div className="category-box" id={element} key={index} onClick={() => {
                                    this.props.onSearchData('')
                                }}>
                                    <div className="box-text">{element}</div>
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

            <InfoCaption />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);
