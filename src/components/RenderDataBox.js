import React from 'react';
import { Link } from 'react-router-dom'

const RenderDataBox = ({ category, element, index, pageIndex, onSearchData }) => {
    let elmt = element.name || element.title    // elmt is short for element

    let imgStyle
    if (element.imagefile) {
        imgStyle = { backgroundImage: `url(${element.imagefile.url})` }
    }

    return (
        <Link to={`/category/${category}/${elmt.split(' ').join('+').split('/').join('&')}?categorypage=${pageIndex}`} 
        key={index} style={{textDecoration: 'none', color: 'white'}}>
            <div className="category-box" key={index} style={imgStyle}
            onClick={() => { onSearchData('') }}>
                <div className="box-text">{elmt}</div>
            </div>
        </Link>
    )
}

export default RenderDataBox;
