import React, { Component } from 'react'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import PropertiesInfo from '../PropertiesInfo/PropertiesInfo'
import KeyframesInfo from '../KeyframesInfo/KeyframesInfo'
import { NavLink, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'


export class HowToPopup extends Component {

  render() {
    let { animation } = this.props
    if (!animation) {animation = 'slideInX'}
    return (
      <div className="infoPopup-overlay">
        <div className="info-popup">
          <header className="header">
              <NavLink 
                to={`/${animation}/properties/howto/general`}
                activeClassName='selected-section'
                className='howTo header-button'>
                how to play
              </NavLink>
              <NavLink 
                to={`/${animation}/properties/howto/properties`}
                activeClassName='selected-section'
                className='keyframes header-button'>
                keyframes
              </NavLink>
              <NavLink 
                to={`/${animation}/properties/howto/keyframes`}
                activeClassName='selected-section'
                className='animation header-button'>
                animation properties
              </NavLink>
          </header>
          {
            <Switch>
              <Route path={`/${animation}/properties/howto/general`}
                component={GeneralInfo} />
              <Route path={`/${animation}/properties/howto/properties`}
                component={PropertiesInfo} />
              <Route path={`/${animation}/properties/howto/keyframes`}
                component={KeyframesInfo} />
            </Switch>
          }
        <Link to={`/${animation}/properties`} className='close-info-popup-btn'>
          <button className='close-info-popup-btn'>Go!</button>
        </Link>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  animation: state.animation.keyframes.name 
})

HowToPopup.propTypes = {
  animation: PropTypes.string
}

export default connect(mapStateToProps)(HowToPopup)