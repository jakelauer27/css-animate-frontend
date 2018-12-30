import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import KeyframesEditor from '../KeyframesEditor/KeyframesEditor'
import PropertiesEditor from '../PropertiesEditor/PropertiesEditor'
import { loadAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import animationsData from '../../utils/data'
import CopyPopup from '../CopyPopup/CopyPopup'
import { PropTypes } from 'prop-types'

const animationKeys = Object.keys(animationsData)

export class Editor extends Component {

  componentDidMount() {
    this.loadNewAnimation(this.props.currentAnimation)
  }

  loadNewAnimation(animationName) {
    const animationKey = animationKeys.find( key => key === animationName)
    const newAnimation = JSON.parse(JSON.stringify(animationsData[animationKey]))
    this.props.loadNewAnimation(newAnimation)
    CSSInsertion.updateKeyframes(newAnimation.keyframes)
  }
  
  resetInputValidation() {
    document.querySelectorAll('input').forEach( input => {
      input.classList.remove('red');
    });
    document.querySelector('.play-btn').removeAttribute('disabled');
  }


  render() {
    const { animation, currentAnimation } = this.props
    if (!animation.keyframes) {
      return <div></div>
    }
    return (
      <div className='editor-component'>
        <div className='editor-container'>
          <div className='editor-options'>
            <NavLink 
              to={`/${animation.keyframes.name}/properties`}
              className='animation-btn'
              activeClassName='selected'>properties
            </NavLink>
            <NavLink 
              to={`/${animation.keyframes.name}/keyframes`}
              className='keyframes-btn'
              activeClassName='selected'>keyframes
            </NavLink>
          </div>
          <div className='editor'>
          {
            <Switch>
              <Route path={`${process.env.PUBLIC_URL}/${animation.keyframes.name}/keyframes`} component={KeyframesEditor} />
              <Route path={`${process.env.PUBLIC_URL}/${animation.keyframes.name}/properties`} component={PropertiesEditor}/>
            </Switch>
          }
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <Link to={`/${animation.keyframes.name}/properties/copy`} className='lower-btn copy-btn'>
            copy code   
          </Link>
          <Route path={`${process.env.PUBLIC_URL}/${animation.keyframes.name}/properties/copy`} render={() => <CopyPopup currentPage={currentAnimation}/>} />
          <button className={`lower-btn reset-btn`} onClick={() => {
              this.loadNewAnimation(this.props.currentAnimation)
              this.resetInputValidation()  
            }
            }>
            reset
          </button>
        </div>
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  animation: state.animation
})

export const mapDispatchToProps = (dispatch) => ({
  loadNewAnimation: (animation) => dispatch(loadAnimation(animation))
})

Editor.propTypes = {
  animation: PropTypes.object.isRequired,
  loadNewAnimation: PropTypes.func.isRequired,
  currentAnimation: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
