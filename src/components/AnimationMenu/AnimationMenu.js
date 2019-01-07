import React, { Component } from 'react'
import MyAnimationList from '../../containers/AnimationList/MyAnimationList'
import PreBuiltAnimationList from '../../containers/AnimationList/PreBuiltAnimationList'
import CreateAnimationForm from '../CreateAnimationForm/CreateAnimationForm'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { addAnimation } from '../../utils/apiCalls/apiCalls';


export class AnimationMenu extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  loadAnimation() {
    const { templates, loadAnimation, saveOriginalAnimation, myAnimations } = this.props
    if(!this.checkSelected()) {return false}
    const selectedId = document.querySelector('.selected-animation').classList[1]
    const selectedAnimation= templates.find(template => template.id === parseInt(selectedId)) || myAnimations.find(animation => animation.id === parseInt(selectedId))
    
    loadAnimation(selectedAnimation)
    saveOriginalAnimation(JSON.stringify(selectedAnimation))
    CSSInsertion.updateKeyframes(selectedAnimation.keyframes)
    this.setState({redirect: true})
  }

  checkSelected() {
    if (!document.querySelector('.selected-animation')) {
      document.querySelector('.select-animation-message').classList.add('incorrect')
      return false
    }
    return true
  }

  render() {
    let editAnimation = null
    if (this.props.animationForEdit.id) {editAnimation = <CreateAnimationForm/>}
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
          <div className='menu-lower-btn-container'>
            <h3 className='select-animation-message' >Please select an animation</h3>
            <button 
              className='close-select-ani-btn'
              onClick={() => this.loadAnimation()}>Go!
            </button>
          </div>
        </div>
        <Route path='/properties/selectAnimation/create' component={CreateAnimationForm} />
        {editAnimation}
      </div>
    )
  }
}


export const mapStateToProps = (state) => ({
  myAnimations: state.myAnimations,
  templates: state.prebuiltAnimations,
  currentAnimation: state.currentAnimation,
  animationForEdit: state.animationForEdit
})

export const mapDispatchToProps = (dispatch) => ({
  loadAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
  saveOriginalAnimation: (animation) => dispatch(saveOriginalAnimation(animation))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimationMenu)