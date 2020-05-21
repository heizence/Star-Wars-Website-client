import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'
import './BoardPage.css'

class BoardPage extends Component {    
    
    componentDidMount() {
        console.log('sessionToken : ', sessionStorage)
    }

    render() {   
        let contentsInfo = ['No', 'Title', 'Writer', 'Date', 'View']     
        let dummyData = [
            {
                "title": "test01-article1",
                "contents": "test01-article1",
                "writer": "sKLscQooJb",
                "writerUsername": "test01",
                "viewer": ['abc', 'bcd'],
                "like": [],
                "dislike": [],
                "createdAt": "2020-05-21T05:52:30.866Z",
                "updatedAt": "2020-05-21T05:52:30.866Z",
                "objectId": "i7hv5L8yXA"
            },
            {
                "title": "test01-article2",
                "contents": "test01-article2",
                "writer": "sKLscQooJb",
                "writerUsername": "test01",
                "viewer": ['a', 'b', 'c', 'd', 'e'],
                "like": [],
                "dislike": [],
                "createdAt": "2020-05-21T05:52:30.866Z",
                "updatedAt": "2020-05-21T05:52:30.866Z",
                "objectId": "i7hv5L8yXA"
            },
            {
                "title": "test01-article3",
                "contents": "test01-article3",
                "writer": "sKLscQooJb",
                "writerUsername": "test01",
                "viewer": [],
                "like": [],
                "dislike": [],
                "createdAt": "2020-05-21T05:52:30.866Z",
                "updatedAt": "2020-05-21T05:52:30.866Z",
                "objectId": "i7hv5L8yXA"
            }
        ]

        return (   
            <div className="main">
            <Navbar />
            <div style={{minHeight: '85vh'}}>
                <div style={{paddingTop: '50px'}}>
                    <h1 style={{color: 'white'}}>BOARD</h1>
                    <h2 style={{color: 'yellow', marginBottom: '100px'}}>This is free board page.</h2>
                </div>   

                <div id="board-container">
                    <div className="board-contentsInfo">
                        {contentsInfo.map((con, index) => 
                            <span key={index} id={`contents-${con}`}>{con}</span>
                        )}
                    </div>
                    
                    {dummyData.length === 0 ?
                        <div id="no-contents-caption">No articles written.</div>
                        :
                        <div id="board-contents">
                        {dummyData.map((data, index) => {
                            return (
                                <div key={index} className="board-contentsInfo">
                                    <span id="contents-No">{index}</span>
                                    
                                    <span className="contents-section" id="contents-Title">{data.title}</span>
                                    
                                    <span className="contents-section" id="contents-Writer">{data.writerUsername}</span>
                                    <span className="contents-section" id="contents-Date">{data.createdAt}</span>
                                    <span id="contents-View">{data.viewer.length}</span>
                                </div>
                            )
                        })}
                        </div>
                    }
                </div>

                <div></div>
            </div>  

            <InfoCaption />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
