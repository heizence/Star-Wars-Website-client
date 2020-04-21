import React from 'react';

const RenderImage = ({ image }) => {
    return (
        <div className="contents-imgbox" style={{ backgroundImage: `url(${image})`}}>img</div>
    )
}

export default RenderImage;
