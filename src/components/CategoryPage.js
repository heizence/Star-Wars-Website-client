import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestPeople } from '../reduxFiles/actionCreators'

const mapStateToProps = (state) => {
    return {
        people: state.people,
        isPending: state.isPending,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestPeople: () => requestPeople(dispatch)
    }
}

class categoryPage extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.onRequestPeople()
        
    }
    render() {
        console.log('data check : ', this.props.people)

        let category = this.props.category

        return (
            <div className="main">
            <div style={{paddingTop: '50px'}}><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
            width="400" alt=""></img>
            <h1 style={{color: 'white'}}>{category.toUpperCase()}</h1>
            <h2 style={{color: 'white'}}>Search any person you'd like to find</h2>
            <input />
            </div>

            <div className="category-container">       
                
            </div>      
            

            <div style={{color: 'white', fontSize: '20px', marginTop: '40px', paddingBottom: '40px'}}>
            Informations are provided by Star Wars API. If you would like to know about Star Wars API, 
            visit <a href="https://swapi.co" target="blank">https://swapi.co</a>
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryPage);