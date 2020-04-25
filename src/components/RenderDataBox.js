import React from 'react';
import { Link } from 'react-router-dom'

const RenderDataBox = ({ category, element, onSearchData }) => {
    let { imagefile } = element
    let nameOrTitle = element.name || element.title // title is for film category

    // If element has image file, render it as a background image
    let imgStyle
    if (imagefile) {
        imgStyle = { backgroundImage: `url(${imagefile})` }
    }

    return (
        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        <Link to={`/category/${category}/${nameOrTitle.split(' ').join('+').split('/').join('&')}`} 
        style={{textDecoration: 'none', color: 'white'}}>
            <div className="category-box" style={imgStyle}
            onClick={() => { onSearchData('') }}>
                <div className="box-text">{nameOrTitle}</div>
            </div>
        </Link>
    )
}

export default RenderDataBox;
