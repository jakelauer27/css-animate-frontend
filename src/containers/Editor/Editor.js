import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import KeyframesEditor from '../KeyframesEditor/KeyframesEditor'
import PropertiesEditor from '../PropertiesEditor/PropertiesEditor'
import { updateCurrentAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import CopyPopup from '../CopyPopup/CopyPopup'
import { PropTypes } from 'prop-types'

export class Editor extends Component {

  resetAnimation(animation) {
    animation = JSON.parse(animation)
    this.props.updateCurrentAnimation(animation)
    CSSInsertion.updateKeyframes(animation.keyframes)
    this.resetInputValidation()
  }
  
  resetInputValidation() {
    document.querySelectorAll('input').forEach( input => {
      input.classList.remove('red');
    });
    document.querySelector('.play-btn').removeAttribute('disabled');
  }


  render() {
    const { currentAnimation } = this.props

    return (
      <div className='editor-component'>
        <div className='editor-container'>
          <div className='editor-options'>
            <NavLink 
              to={`/properties`}
              className='animation-btn'
              activeClassName='selected'>properties
            </NavLink>
            <NavLink 
              to={`/keyframes`}
              className='keyframes-btn'
              activeClassName='selected'>keyframes
            </NavLink>
          </div>
          <div className='editor'>
          {
          <Switch>
            <Route path={`/properties`} component={PropertiesEditor}/>
            <Route path={`/keyframes`} component={KeyframesEditor}/>
          </Switch>
          }
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <Link to={`/properties/copy`} className='lower-btn copy-btn'>
            copy code   
          </Link>
          <Route path={`/properties/copy`} render={() => <CopyPopup currentPage={currentAnimation}/>} />
          <button className={`lower-btn reset-btn`} onClick={() => this.resetAnimation(this.props.originalAnimation)}>
            reset
          </button>
        </div>
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  originalAnimation: state.originalAnimation,
  currentAnimation: state.currentAnimation
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation))
})

Editor.propTypes = {
 originalAnimation: PropTypes.string,
 currentAnimation: PropTypes.object,
 updateCurrentAnimation: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
