import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import RenderDataBox from './RenderDataBox'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'

class categoryPage extends Component {    
    searchDataAndRender(text) {
        let data = this.props.names_data.filter(element => {
            let str = element.name || element.title
            let txt = new RegExp(text, "i")
            return txt.test(str)
        })
        return data
    }

    renderPageButtons(category) {
        const numberOfPages = this.props.names_data.length
    
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
        this.props.onRequestNames(this.props.category)
    }

    render() {        
        let pageIndex = this.props.location.search.split('=')[1]
        let category = this.props.category
        let data
        
        if (this.props.text) {
            data = this.searchDataAndRender(this.props.text)
        } 
        // Set index only data type is Array, especially moved back from EachDataPage. 
        else if (!this.props.names_isPending) {
            // Render 12 items per a page
            let startIndex = (pageIndex-1) * 12
            let endIndex = pageIndex * 12
            data = this.props.names_data.slice(startIndex, endIndex)
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
                    {!this.props.names_isPending && data? 
                    <div>
                        <div className="category-container">
                        {data.map((element, index) =>  
                            <RenderDataBox key={index}
                            category={category} element={element} 
                            index={index} pageIndex={pageIndex} 
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
                    }}>{this.props.names_error ? 'Error! Please try again later' : 'Loading...'}</div>
                    } 
                </div>    
            </div>  

            <InfoCaption />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);
