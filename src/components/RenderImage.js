import React from 'react';

const RenderImage = ({ imagefile }) => {
    let imgStyle, tag

    // Set background image when image exists
    if (imagefile) {
        imgStyle = { backgroundImage: `url(${imagefile})` }
        tag = ''
    }
    else {
        tag = <div style={{ marginTop: '50%', fontSize: '30px', fontWeight: 'bold' }}>NO<br></br>IMAGE</div>
    }
    return (
        <div className="contents-imgbox" style={imgStyle}>{tag}</div>
    )
}

export default RenderImage;
