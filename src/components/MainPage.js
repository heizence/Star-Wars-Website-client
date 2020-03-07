import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

const categories = [ "People", "Vehicles", "Planets", "Spaceships", "Species", "Films"]

function mainPage() {
  return (
    
    <div className="main">
      <div style={{paddingTop: '50px'}}><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png"
      width="400" alt=""></img>
      <h1 style={{color: 'white'}}>Welcome To Star Wars Website!</h1>
      <h2 style={{color: 'white'}}>This website provides brief information about things in Star Wars.</h2>
      <h2 style={{color: 'yellow'}}>Choose any category below.</h2>
      </div>

      <div className="category-container">       
        {categories.map((element, index) => 
            <Link to={`/${element.toLowerCase()}`} key={index} style={{textDecoration: 'none', color: 'white'}}>
                <div className="category-box" id={element} key={index}>{element}</div>
            </Link>
        )}
      </div>      

      <div style={{color: 'white', fontSize: '20px', marginTop: '40px', paddingBottom: '40px'}}>
      Informations are provided by Star Wars API. If you would like to know about Star Wars API, 
      visit <a href="https://swapi.co" target="blank">https://swapi.co</a>
      </div>
    </div>
  );
}

export default mainPage;
