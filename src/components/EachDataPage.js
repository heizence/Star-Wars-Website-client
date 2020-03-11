import React, { Component } from 'react';
import { connect } from 'react-redux'
import { requestData } from '../reduxFiles/actionCreators'

const mapStateToProps = (state) => {
    return {
        data: state.fetchData.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestData: (category) => dispatch(requestData(category))
    }
}

const filteringData = (data, name) => {
    return data.filter((element) => {
        return (element.name === name || element.title === name) 
    })
  }

class eachDataPage extends Component {
    componentDidMount() {
        this.props.onRequestData(this.props.match.category)
    }
    
    render() {
        let info = this.props.match.info.split('+').join(' ')
        let filteredData = filteringData(this.props.data, info)

        console.log('match 확인 : ', this.props.match)
        console.log('걸러진 데이터 확인 : ', filteredData[0])

        return (
            <div className="main">
                <div style={{paddingTop: '50px'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
                    width="400" alt=""></img>
                    <h1 style={{color: 'white'}}>{info}</h1>                
                </div>
            </div>
        )
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(eachDataPage);

