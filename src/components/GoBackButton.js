import React from 'react';
import { Link } from 'react-router-dom'

const GoBackButton = (props) => {
    let addr
    if (!props.address) {
        addr = '/'
    }
    else {
        addr = `/${props.address}?page=${props.index}`
    }
    return (
        <div>
            <Link to={addr}>
                <button id='back-button' onClick={props.onClick}>{props.text}</button>
            </Link>
        </div>
    )
}

export default GoBackButton
