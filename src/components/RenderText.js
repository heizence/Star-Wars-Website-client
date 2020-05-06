import React from 'react'
import { Link } from 'react-router-dom'

// Render non-relational data
export const renderTextData = (object) => {   
    console.log('renderTextData : ', object)
    return Object.keys(object).map((key, index) => {
        if (key !== 'relationalData') {
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
            // Filter all unnecessary items
            else if (
            key !== 'name' && key !== 'title' && key !== 'createdAt' && key !== 'pageIndex' 
            && key !== 'homeworld' && key !== 'updatedAt' && key !== 'objectId' && key !== 'imagefile'
            ) {
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
export const renderRelationalData = (object) => {  
    let data = object.relationalData
    console.log('renderRelationalData : ', data)
    return Object.keys(data).map((key, index) => {
        return (
            <div key={index} className="each-relationalBox">
                <div className="contents-tag">Related {data[key].category}</div> 
                {data[key].data.length > 0 ?
                    data[key].data.map((element, index2) => {
                        console.log('data render : ', element)
                        if (element) {
                            return (
                            <div key={index2} style={{display: 'inline-block', marginRight: '10px'}}>
                                <Link to={`/category/${data[key].category}/${element.split(' ').join('+').split('/').join('&')}`}
                                className="text-link">{element}</Link>
                            {index2 < data[key].data.length-1 ? ',' : ''}
                            </div>
                            )
                        }
                        else { return 'none'}
                    }) 
                    :
                    <div style={{display: 'inline-block', marginRight: '10px'}}>none
                    </div>
                }
            </div>
        )
    })
}
