import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'
import RenderImage from './RenderImage'
import { renderTextData, renderRelationalData } from './RenderText'

/*
const dummyData = { name: 'Obi-Wan Kenobi',
gender: 'male',
skinColor: 'fair',
hairColor: 'auburn, white',
height: 182,
eyeColor: 'blue-gray',
mass: 77,
homeworld: [ 'Stewjon' ],
birthYear: '57BBY',
createdAt: '2019-12-13T19:42:31.498Z',
updatedAt: '2020-04-23T05:39:18.109Z',
imagefile:
 { __type: 'File',
   name: 'ef514565ab1994d3079931ff4a8bd243_Obi-Wan Kenobi.jpg',
   url:
    'https://parsefiles.back4app.com/pnKgu5IKxHxRbqVt5L7l7bJLgvfE5GyLwUc7jzzr/ef514565ab1994d3079931ff4a8bd243_Obi-Wan%20Kenobi.jpg' },
species: { type: 'relational', category: 'Specie', data: [] },
vehicles:
 { type: 'relational',
   category: 'Vehicle',
   data: [ 'Tribubble bongo' ] },
starships:
 { type: 'relational',
   category: 'Starship',
   data:
    [ 'Jedi starfighter',
      'Trade Federation cruiser',
      'Naboo star skiff',
      'Jedi Interceptor',
      'Belbullab-22 starfighter' ] },
films:
 { type: 'relational',
   category: 'Film',
   data:
    [ 'A New Hope',
      'Attack of the Clones',
      'Revenge of the Sith',
      'Return of the Jedi',
      'The Phantom Menace',
      'The Empire Strikes Back' ] },
objectId: 'nxpAPnATEb' }
*/
class eachDataPage extends Component {
    componentDidMount() {
        console.log('sessionToken : ', sessionStorage)
        let { category, name } = this.props.match

        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        name = name.split('+').join(' ').split('&').join('/') 
        this.props.onRequestSpecificData(category, name)
    }
    
    render() {
        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        let name = this.props.match.name.split('+').join(' ').split('&').join('/')
        let dataToRender = this.props.specific_data
        let pageIndex = this.props.location.search.split('=')[1]
        console.log('data check : ' ,dataToRender)
        
        return (
            <div className="main">
            <Navbar />
            <div style={{minHeight: '80vh'}}>
                <div style={{paddingTop: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{name}</h1>   
                    <GoBackButton text="Go Back to category" category={this.props.match.category} index={pageIndex} 
                    onClick={() => this.props.onRequestNames(this.props.match.category)}/>
                    <div>
                        {!this.props.specific_isPending && dataToRender? 
                            <div>
                        <div className="contents-box">
                           
                        <RenderImage imagefile={dataToRender["imagefile"]} />
                            <div className="contents-textbox">{renderTextData(dataToRender)}</div>
                        </div>
                        <div className="contents-relationalBox">{renderRelationalData(dataToRender, pageIndex)}</div>
                        </div>
                        : <div style={{
                            color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                        }}>{this.props.specific_error ? 'Error! Please try again later' : 'Loading...'}</div>
                        }       
                    </div>
                </div>
                </div>

                <InfoCaption />
            </div>            
        )        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(eachDataPage);
