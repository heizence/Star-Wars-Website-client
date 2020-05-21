import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import { Link } from 'react-router-dom'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'
import './EachBoardArticle.css'

class EachBoardArticle extends Component {    

    componentDidMount() {
        console.log('sessionToken : ', sessionStorage)
    }

    render() {   
        let header = ['title', 'writerUsername', 'createdAt', 'updatedAt']
        let tail = ['viewer', 'like', 'dislike']

        let dummyData = {
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
        }

        return (   
            <div className="main">
                <Navbar />

                <div style={{minHeight: '85vh', marginTop: '100px'}}>

                    <div id="article-container">
                        <div>
                            <div id="header-title">{dummyData.title}</div>
                            <div id="article-header">
                                <span>written by {dummyData.writerUsername}</span>
                                <span>{dummyData.createdAt}</span>
                                <span>{dummyData.updatedAt || ''}</span>
                            </div>
                        </div>

                        <div id="article-content">
                            <p>{dummyData.contents}</p>
                        </div>
                    </div>
                </div>

                <InfoCaption />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EachBoardArticle);
