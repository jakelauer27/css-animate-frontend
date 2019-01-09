import React, { Component } from 'react'
import * as API from '../../utils/apiCalls/apiCalls'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { getMyAnimations } from '../../thunks/getMyAnimations'

export class Saveas extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }

  async handleChange(e) {
    this.setState({name: e.target.value})
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { user_id, currentAnimation, updateCurrentAnimation, saveOriginalAnimation, getMyAnimations, closePopup } = this.props
    let newAnimation = {...currentAnimation}
    newAnimation.properties.name = this.state.name
    newAnimation.keyframes.name = this.state.name
    newAnimation.ani_name = this.state.name
    newAnimation.user_id = user_id
    const saved = await API.addAnimation(user_id, this.state.name, JSON.stringify(newAnimation.properties), JSON.stringify(newAnimation.keyframes))
    newAnimation.id = saved.id
    await getMyAnimations(user_id)
    saveOriginalAnimation(JSON.stringify(newAnimation))
    updateCurrentAnimation(newAnimation)
    closePopup()
  }

  cancel(e) {
    e.preventDefault()
    this.props.closePopup()
  } 

  render() {
    if (!this.props.user_id) {
      return (
        <div className='form-container'>
        <div className='infoPopup-overlay'></div>
        <form className='saveas-form'>
          <h2>Access this feature by logging in</h2>
          <button onClick={(e) => this.cancel(e)} className='cancel-form-btn cancel-saveas'>Ok</button>
        </form>
      </div>
      )
    }
    return (
      <div className='form-container'>
        <div className='infoPopup-overlay'></div>
        <form className='saveas-form'>
          <h2>Save Animation As</h2>
          <input type='text' value={this.state.name} placeholder='name' onChange={(e) => this.handleChange(e)}>
          </input>
          <button onClick={(e) => this.handleSubmit(e)} className='save-form-btn'>Save</button>
          <button onClick={(e) => this.cancel(e)} className='cancel-form-btn cancel-saveas'>cancel</button>
        </form>
      </div>
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

Saveas.propTypes = {
  user_id: PropTypes.number,
  currentAnimation: PropTypes.object.isRequired,
  updateCurrentAnimation: PropTypes.func.isRequired,
  saveOriginalAnimation: PropTypes.func.isRequired,
  getMyAnimations: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Saveas)