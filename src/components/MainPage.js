import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../reduxFiles/props'
import Navbar from './Navbar'
import InfoCaption from './InfoCaption'

class MainPage extends Component {
  componentDidMount() {
    console.log('sessionToken : ', sessionStorage)
    // Reset Data
    this.props.onResetData()
  }

  render() {
    const categories = [ "Character", "Film", "Planet", "Specie", "Starship", "Vehicle"]
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
              <Link to={`/category/${element}?categorypage=1`} key={index} style={{textDecoration: 'none', color: 'white'}}>
                  <div className="category-box" id={element} key={index} onClick={() => {
                    console.log('Category box clicked : ', element)
                  }}>
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

export default connect(null, mapDispatchToProps)(MainPage);
