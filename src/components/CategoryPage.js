import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import RenderDataBox from './RenderDataBox'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'

class CategoryPage extends Component {    
    searchDataAndRender(text) {
        let data = this.prData_data.filter(element => {
            let str = element.name || element.title
            let txt = new RegExp(text, "i")
            return txt.test(str)
        })
        return data
    }

    renderPageButtons(category) {
        const numberOfPages = this.props[category].length
    
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
        this.props.onRequestPageMove(window.location.href)  // Save current page URL
        console.log('sessionToken : ', sessionStorage)
        
        // When refreshing browser
        if (!this.props[this.props.category]) {
            this.props.onRequestData(this.props.category)
        }
        
    }

    render() {        
        let pageIndex = this.props.location.search.split('=')[1]
        let category = this.props.category
        let dataToRender

        if (this.props.text) {
            console.log('searchText : ' , this.props.text)
            dataToRender = this.searchDataAndRender(this.props.text)
        } 
        // Set index only data type is Array, especially moved back from EachDataPage. 
        else if (!this.props.isPending) {
            // Render 12 items per a page
            let startIndex = (pageIndex-1) * 12
            let endIndex = pageIndex * 12
            dataToRender = this.props[category].slice(startIndex, endIndex)
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
                    {!this.props.isPending && dataToRender ? 
                    <div>
                        <div className="category-container">
                        {dataToRender.map((element, index) =>  
                            <RenderDataBox key={index}
                            category={category} element={element} 
                            onSearchData={this.props.onSearchData}/>                      
                        )}                    
                        </div>
                        
                        <div style={{marginTop: '50px'}}>
                        <h2 style={{color: 'white'}}>Pages</h2>
                        {this.renderPageButtons(category)}
                        </div>
                    </div>
                    : <div style={{
                        color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                    }}>{this.props.error ? 'Error! Please try again later' : 'Loading...'}</div>
                    } 
                </div>    
            </div>  

            <InfoCaption />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
