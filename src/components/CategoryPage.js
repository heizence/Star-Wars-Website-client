import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'

class categoryPage extends Component {    
    searchDataAndRender(text) {
        let data = this.props.data.filter(element => {
            let str = element
            let txt = new RegExp(text, "i")
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
        console.log('sessionToken : ', sessionStorage)
        this.props.onRequestData(this.props.category, 'getnames')
    }

    render() {        
        console.log('previous page : ' ,)

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
            <Navbar />
            <div style={{minHeight: '85vh'}}>
                <div style={{paddingTop: '50px'}}>
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
                    {this.props.isPending || !Array.isArray(this.props.data) ? 
                    <div style={{
                        color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                    }}>{this.props.error ? "Error! Please try again later" : "Loading..."}</div> :
                    
                    <div>
                        <div className="category-container">
                        {data.map((element, index) =>  
                            <Link to={`/category/${category}/${element.split(' ').join('+').split('/').join('&')}?categorypage=${pageIndex}`} 
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
