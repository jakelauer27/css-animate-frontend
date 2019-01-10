import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { editAnimation } from '../../utils/apiCalls/apiCalls'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import CopyPopup from '../CopyPopup/CopyPopup'
import KeyframesEditor from '../KeyframesEditor/KeyframesEditor'
import PropertiesEditor from '../PropertiesEditor/PropertiesEditor'
import Saveas from '../Saveas/Saveas'

export class Editor extends Component {
  constructor() {
    super()
    this.state = {
      saveText: 'save',
      saveas: false
    }
  }

  resetAnimation() {
    const newAnimation = JSON.parse(this.props.originalAnimation)
    this.props.updateCurrentAnimation(newAnimation)
    CSSInsertion.updateKeyframes(newAnimation.keyframes)
    this.resetInputValidation()
  }
  
  resetInputValidation() {
    document.querySelectorAll('input').forEach( input => {
      input.classList.remove('red');
    });
    document.querySelector('.play-btn').removeAttribute('disabled');
  }

  async saveAnimation() {
    this.setState({saveText: 'saved!'})
    const { saveOriginalAnimation, currentAnimation, user_id } = this.props
    saveOriginalAnimation(JSON.stringify({...currentAnimation}))
    await editAnimation(user_id, currentAnimation.id, currentAnimation)
    setTimeout(this.resetSaveText, 2000)
  }

  resetSaveText = () => {
    this.setState({saveText: 'save'})
  }

  toggleSaveas = () => {
    this.setState({saveas: !this.state.saveas})
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
          <Route path={`/properties/copy`} render={() => <CopyPopup />} />
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <Link to={`/properties/copy`} className='lower-btn copy-btn'>
            copy code   
          </Link>
          <button className={`lower-btn reset-btn`} onClick={() => this.resetAnimation()}>
            reset
          </button>  
            <button className='lower-btn save-as-btn' onClick={this.toggleSaveas}>save as</button>
          <button 
            className={`lower-btn save-btn`} 
            disabled={!currentAnimation.user_id}
            onClick={() => {
              this.saveAnimation()
            }}>
            {this.state.saveText}
          </button>
          {
            (this.state.saveas && <Saveas closePopup={this.toggleSaveas}/>)
          }
        </div>
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  user_id: state.user.id,
  originalAnimation: state.originalAnimation,
  currentAnimation: state.currentAnimation
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
  saveOriginalAnimation: (animation) => dispatch(saveOriginalAnimation(animation)),
})

Editor.propTypes = {
 user_id: PropTypes.number,
 originalAnimation: PropTypes.string,
 currentAnimation: PropTypes.object,
 updateCurrentAnimation: PropTypes.func.isRequired,
 saveOriginalAnimation: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
