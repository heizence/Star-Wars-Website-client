import React from 'react';

const RenderImage = ({ imagefile }) => {
    console.log('Render Image : ', imagefile)
    let imgStyle, tag

    if (imagefile) {
        imgStyle = { backgroundImage: `url(${imagefile.url})` }
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
