import React, { Component } from 'react'
import { NavLink, Route, Switch, Link } from 'react-router-dom'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import KeyframesInfo from '../KeyframesInfo/KeyframesInfo'
import PropertiesInfo from '../PropertiesInfo/PropertiesInfo'


export default class HowToPopup extends Component {

  render() {
    return (
      <div className="infoPopup-overlay">
        <div className="info-popup">
          <header className="header">
              <NavLink 
                to={`/properties/howto/general`}
                activeClassName='selected-section'
                className='howTo header-button'>
                how to play
              </NavLink>
              <NavLink 
                to={`/properties/howto/properties`}
                activeClassName='selected-section'
                className='keyframes header-button'>
                keyframes
              </NavLink>
              <NavLink 
                to={`/properties/howto/keyframes`}
                activeClassName='selected-section'
                className='animation header-button'>
                animation properties
              </NavLink>
          </header>
          {
            <Switch>
              <Route path={`/properties/howto/general`}
                component={GeneralInfo} />
              <Route path={`/properties/howto/properties`}
                component={PropertiesInfo} />
              <Route path={`/properties/howto/keyframes`}
                component={KeyframesInfo} />
            </Switch>
          }
        <Link to={`/properties`} className='close-info-popup-btn'>
          Go!
        </Link>
        </div>
      </div>
    )
  }
}
