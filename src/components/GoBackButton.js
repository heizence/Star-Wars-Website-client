import React from 'react';
import { Link } from 'react-router-dom'

const GoBackButton = (props) => {
    console.log('goback button executed: ', props)
    let addr

    // Go back to main
    if (!props.category) {
        addr = '/'
    }

    // Go back to category page
    else {
        addr = `/category/${props.category}?categorypage=${props.index}`
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
