import React, { Component } from 'react';
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reduxFiles/props'
import GoBackButton from './GoBackButton'
import InfoCaption from './InfoCaption'
import Navbar from './Navbar'
import RenderImage from './RenderImage'
import { renderTextData, renderRelationalData } from './RenderText'

const dummyData = { releaseDate: '1977-05-25T00:00:00.000Z',
producer: 'Gary Kurtz, Rick McCallum',
title: 'A New Hope',
episodeId: 4,
director: 'George Lucas',
openingCrawl:
 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
createdAt: '2019-12-13T19:42:35.590Z',
updatedAt: '2019-12-13T19:42:35.590Z',
planets:
 { type: 'relational',
   category: 'Planet',
   data: [ 'Alderaan', 'Yavin IV', 'Tatooine' ] },
characters:
 { type: 'relational',
   category: 'Character',
   data:
    [ 'Darth Vader',
      'Beru Whitesun lars',
      'Chewbacca',
      'Leia Organa',
      'R2-D2',
      'R5-D4',
      'Jek Tono Porkins',
      'Raymus Antilles',
      'Owen Lars',
      'Luke Skywalker',
      'Biggs Darklighter',
      'Wedge Antilles',
      'Wilhuff Tarkin',
      'Jabba Desilijic Tiure',
      'Obi-Wan Kenobi',
      'Greedo',
      'C-3PO',
      'Han Solo' ] },
starships:
 { type: 'relational',
   category: 'Starship',
   data:
    [ 'X-wing',
      'Y-wing',
      'CR90 corvette',
      'TIE Advanced x1',
      'Millennium Falcon',
      'Sentinel-class landing craft',
      'Star Destroyer',
      'Death Star' ] },
vehicles:
 { type: 'relational',
   category: 'Vehicle',
   data:
    [ 'T-16 skyhopper',
      'TIE/LN starfighter',
      'Sand Crawler',
      'X-34 landspeeder' ] },
species:
 { type: 'relational',
   category: 'Specie',
   data: [ 'Droid', 'Rodian', 'Hutt', 'Wookie', 'Human' ] },
objectId: 'GteveE4ytb' }

class eachDataPage extends Component {
    componentDidMount() {
        console.log('sessionToken : ', sessionStorage)
        let { category, name } = this.props.match

        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        name = name.split('+').join(' ').split('&').join('/') 
        this.props.onRequestData(category, 'getdata', name)
    }
    
    render() {
        /* Refactoring name
        split('&').join('/') is for names which include '/'. For example : TIE/LN starfighter */
        let name = this.props.match.name.split('+').join(' ').split('&').join('/')
        let dataToRender = this.props.data
        let pageIndex = this.props.location.search.split('=')[1]
        
        return (
            <div className="main">
            <Navbar />
            <div style={{minHeight: '80vh'}}>
                <div style={{paddingTop: '30px'}}>
                    <h1 style={{color: 'white', fontSize: '50px'}}>{name}</h1>   
                    <GoBackButton text="Go Back to category" category={this.props.match.category} index={pageIndex} 
                    onClick={() => this.props.onRequestData(this.props.match.category, 'getnames')}/>
                    <div>
                        {!this.props.isPending ? 
                            <div>
                        <div className="contents-box">
                           
                        <RenderImage image={"../images/C-3PO.jpg"} />
                            <div className="contents-textbox">{renderTextData(dataToRender)}</div>
                        </div>
                        <div className="contents-relationalBox">{renderRelationalData(dataToRender, pageIndex)}</div>
                        </div>
                        : <div style={{
                            color: 'white', marginTop: '50px', fontSize: '30px', fontWeight: 'bold'                    
                        }}>{this.props.error ? 'Error! Please try again later' : 'Loading...'}</div>
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
