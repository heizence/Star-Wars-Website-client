import React from 'react';
import { Link } from 'react-router-dom'

const GoBackButton = (props) => {
    let addr
    if (!props.address) {
        addr = '/'
    }
    else {
        addr = `/${props.address}`
    }
    return (
        <div>
            <Link to={addr}>
                <button id='back-button'>{props.text}</button>
            </Link>
        </div>
    )
}

export default GoBackButton
