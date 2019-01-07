import React, { Component } from 'react'
import * as API from '../../utils/apiCalls/apiCalls'
import { connect } from 'react-redux'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { Redirect } from 'react-router-dom'

export class Saveas extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { user_id, currentAnimation, updateCurrentAnimation, saveOriginalAnimation, getMyAnimations } = this.props
    let newAnimation = {...currentAnimation}
    newAnimation.properties.name = this.state.name
    newAnimation.keyframes.name = this.state.name
    newAnimation.name = this.state.name
    await API.addAnimation(user_id, this.state.name, JSON.stringify(newAnimation.properties), JSON.stringify(newAnimation.keyframes))
    await getMyAnimations(user_id)
    saveOriginalAnimation(newAnimation)
    updateCurrentAnimation(newAnimation)
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/properties'/>
    } 
    return (
      <form className='saveas-form'>
        <input type='text' value={this.state.name} placeholder='name' onChange={this.handleChange}>
        </input>
        <button onClick={this.handleSubmit} className='save-form-btn'>Save</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  user_id: state.user.id,
  currentAnimation: state.currentAnimation
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
  saveOriginalAnimation: (animation) => dispatch(saveOriginalAnimation(animation)),
  getMyAnimations: (id) => dispatch(getMyAnimations(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Saveas)