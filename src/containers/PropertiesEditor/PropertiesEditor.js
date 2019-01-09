import React, { Component } from 'react'
import { connect } from 'react-redux'
import { validateAnimationProp } from '../../utils/formValidators/formValidators'
import { updateCurrentAnimation } from '../../actions/actions'
import { uid } from 'react-uid'
import { PropTypes } from 'prop-types'
import { prebuiltButtonDisabler, buttonDisabler } from '../../utils/buttondisablers'

const aniPropsLabels = ['duration', 'timingFunction', 'delay', 'iterationCount', 'direction', 'fillMode']
const aniProps = ['duration', 'timingFunction', 'delay', 'iterationCount', 'direction', 'fillMode']

export class PropertiesEditor extends Component {

  saveForm(e) {
    document.querySelector('.stop-btn').click()
    let newAnimation = JSON.parse(JSON.stringify(this.props.currentAnimation))
    newAnimation.properties[e.target.classList[1]] = e.target.value
    this.props.updateCurrentAnimation(newAnimation)
    const valid = validateAnimationProp(e.target, e.target.value)

    if(this.props.currentAnimation.user_id) {
      buttonDisabler(valid)
    } else {
      prebuiltButtonDisabler(valid)
    }
  }

  render() {
    const { currentAnimation } = this.props 
    if (!currentAnimation.properties) {
      return <div></div>
    }
    return (
      <div className='animation-container'>
        <div className='class-container'>
          <p className='class-selector'>.square <span>{'{'}</span></p>
          <div className='props-container'>
            <p className='ani-prop name'>name<span>:</span></p>
            <p className='prop-input name' id='name'>{currentAnimation.properties.name}</p>
          </div>
          {
            aniPropsLabels.map( (prop, i) => {
              return (
                <div className='props-container' key={uid(prop)}>
                  <p className={`ani-prop ${[aniProps[i]]}`}>{prop}<span>:</span></p>
                  <input className={`prop-input ${[aniProps[i]]}`} 
                    type='text' 
                    value={currentAnimation.properties[aniPropsLabels[i]]}
                    onChange={e => this.saveForm(e)}></input>
                </div>
              )
            })
          }
          <p className='close-curly'>{'}'}</p>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  currentAnimation: state.currentAnimation
})

export const mapDispatchToProps = (dispatch) => ({
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation))
})

PropertiesEditor.propTypes = {
  animation: PropTypes.object,
  updateCurrentAnimation: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor)
