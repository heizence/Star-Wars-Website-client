import React from 'react';

const NavigationBar = (props) => {

  return (
    <div id="navbar">
      <a href='/'>
      <img id="main-logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/36/SW_opening_crawl_logo.svg/1024px-SW_opening_crawl_logo.svg.png" 
      width="200px" heigh="40" alt="" ></img>      
      </a>
        <div id='navbar-text'>        
        <ul>
          <li><a href='/signin'>Sign in</a></li>
          <li><a href='/'>Home</a></li>
          <li><a href='/board'>Board</a></li>         
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;
