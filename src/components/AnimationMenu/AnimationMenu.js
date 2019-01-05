import React, { Component } from 'react'
import { MyAnimationList } from '../../containers/AnimationList/MyAnimationList'
import PreBuiltAnimationList from '../../containers/AnimationList/PreBuiltAnimationList'
import CreateAnimationForm from '../CreateAnimationForm/CreateAnimationForm'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import * as CSSInsertion from '../../utils/keyframesInsertion'


export class AnimationMenu extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  loadAnimation() {
    const { templates, loadAnimation, saveOriginalAnimation } = this.props
    const selectedId = document.querySelector('.selected-animation').classList[1]
    const selectedPrebuilt = templates.find(template => template.id === parseInt(selectedId))
    loadAnimation(selectedPrebuilt)
    saveOriginalAnimation(JSON.stringify(selectedPrebuilt))
    CSSInsertion.updateKeyframes(selectedPrebuilt.keyframes)
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/properties' />
    }
    return (
      <div className='select-ani-container'>
        <div className='infoPopup-overlay'></div>
        <div className='select-ani-popup'>
          <header className='select-ani-container-header'>
            <h2 className='my-ani-header'>My Animations</h2>
            <h2 className='prebuilt-ani-header'>Prebuilt Templates</h2>
          </header>
          <div className='list-container'>
            <MyAnimationList />
            <PreBuiltAnimationList />
          </div>
          <button 
            className='close-select-ani-btn'
            onClick={() => this.loadAnimation()}>Go!
          </button>
        </div>
        <Route path='/properties/selectAnimation/create' component={CreateAnimationForm} />
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  templates: state.prebuiltAnimations,
  currentAnimation: state.currentAnimation
})

export const mapDispatchToProps = (dispatch) => ({
  loadAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
  saveOriginalAnimation: (animation) => dispatch(saveOriginalAnimation(animation))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimationMenu)