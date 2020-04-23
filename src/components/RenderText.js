import React from 'react'
import { Link } from 'react-router-dom'

// Render non-relational data
export const renderTextData = (object) => {    
    console.log('renderTextData : ', object)
    return Object.keys(object).map((key, index) => {
        if (key === 'imagefile') {
            console.log('renderTextData : ', key, object[key])
        }
        if (object[key] && !object[key]["type"]) {
            if (Array.isArray(object[key])) {
                if (object[key].length > 0) {
                    return (
                        <div key={index} style={{marginBottom: '10px'}}>
                            <span className="contents-tag">{key} : </span> 
                            {object[key].map((element, index2) => {
                                return (
                                <span key={index2}>{element}{index2 < object[key].length-1 ? ', ' : ''}</span>
                                )
                            })}
                        </div>
                    )
                }
                else {
                    return (
                    <div key={index} className="each-relationalBox">
                        <div className="contents-tag" key={index}>Related {key}</div>none
                    </div>
                    )
                }
            }
            else if (key !== 'name' && key !== 'title' && key !== 'createdAt' 
            && key !== 'updatedAt' && key !== 'objectId' && key !== 'imagefile') {
                return (
                    <div key={index} style={{marginBottom: '10px'}}>
                        <span className="contents-tag">{key} </span>
                        : {object[key] || 'N/A'}
                    </div>
                )
            }
            else {
                return ''
            }
        }
        else {
            return ''
        }
    })
}

// Render relational data structured by array
export const renderRelationalData = (object, pageIndex) => {         
    return Object.keys(object).map((key, index) => {
        if (object[key] && object[key]["type"] === 'relational') {
            if (object[key]["data"].length > 0) {
                return (
                    <div key={index} className="each-relationalBox">
                        <div className="contents-tag">Related {key}</div> 
                        {object[key]["data"].map((element, index2) => {
                            return (
                            <div key={index2} style={{display: 'inline-block', marginRight: '10px'}}>
                                <Link to={`/category/${object[key]["category"]}/${element.split(' ').join('+').split('/').join('&')}?categorypage=${pageIndex}`}
                                className="text-link">{element}</Link>
                            {index2 < object[key]["data"].length-1 ? ',' : ''}
                            </div>
                            )
                        })}
                    </div>
                )
            }
            else {
                return (
                <div key={index} className="each-relationalBox">
                    <div className="contents-tag">Related {key}</div>none
                </div>
                )
            }
        }
        else {
            return ''
        }
    })
}
