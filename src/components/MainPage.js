import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'

const categories = [ "Character", "Film", "Planet", "Specie", "Starship", "Vehicle"]

class MainPage extends Component {
  componentDidMount() {
    this.props.onRequestPageMove(window.location.href)  // Save current page URL
    console.log('sessionToken : ', sessionStorage)
    
    
    // Data fetch
    // for (let i=0; i<categories.length; i++) {
    //   if (!this.props[categories[i]]) {
    //     this.props.onRequestData(categories[i])
    //   }
    // }
  }

  render() {
    const titleStyle = { color: 'white', padding: '0px 30px 0px 30px' }

    return (      
      <div className="main">
        <Navbar />
        <div style={{paddingTop: '30px'}}>
        <h1 style={titleStyle}>Welcome To Star Wars Website!</h1>
        <h2 style={titleStyle}>This website provides brief information about things in Star Wars.</h2>
        <h2 style={{color: 'yellow'}}>Choose any category below.</h2>
        </div>

        <div className="category-container">       
          {categories.map((element, index) => 
              <Link to={`/category/${element}?page=1`} key={index} style={{textDecoration: 'none', color: 'white'}}>
                  <div className="category-box" id={element} key={index}>
                  <div className="box-text">{element}</div>
                  </div>
              </Link>
          )}
        </div>      

        <InfoCaption />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
