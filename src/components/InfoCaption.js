import React from 'react';

const InfoCaption = () => {
    let url = 'https://www.back4app.com/database/davimacedo/swapi-star-wars-api'
    return (
        <div className="APIinfo">
            Informations are provided by Star Wars API by davimacedo. If you would like to know about it, 
            visit here : 
            <a href={url} target="blank" style={{textDecoration: 'none', color: 'blue'}}> Back4app SWAPI</a>
        </div>
    )
}

export default InfoCaption
