import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapDispatchToProps } from '../reduxFiles/props'

const GoBackButton = (props) => {
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
                <button id='back-button' onClick={() => {
                    props.onSearchData('')  // To prevent error
                }}>{props.text}</button>
            </Link>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(GoBackButton);
