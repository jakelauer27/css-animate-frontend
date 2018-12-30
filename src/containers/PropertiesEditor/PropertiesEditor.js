import React, { Component } from 'react'
import { connect } from 'react-redux'
import { validateAnimationProp } from '../../utils/formValidators'
import { loadAnimation } from '../../actions/actions'
import { uid } from 'react-uid'
import { PropTypes } from 'prop-types'

const aniPropsLabels = ['duration', 'timing-function', 'delay', 'iteration-count', 'direction', 'fill-mode']
const aniProps = ['duration', 'timingFunction', 'delay', 'iterationCount', 'direction', 'fillMode']

export class PropertiesEditor extends Component {

  saveForm(e) {
    document.querySelector('.stop-btn').click()
    validateAnimationProp(e.target, e.target.value)
    let newAnimation = JSON.parse(JSON.stringify(this.props.animation))
    newAnimation.properties[e.target.classList[1]] = e.target.value
    this.props.updateAnimation(newAnimation)
  }

  render() {
    const { animation } = this.props 
    return (
      <div className='animation-container'>
        <div className='class-container'>
          <p className='class-selector'>.square <span>{'{'}</span></p>
          <div className='props-container'>
            <p className='ani-prop name'>name<span>:</span></p>
            <p className='prop-input name' id='name'>{animation.properties.name}</p>
          </div>
          {
            aniPropsLabels.map( (prop, i) => {
              return (
                <div className='props-container' key={uid(prop)}>
                  <p className={`ani-prop ${[aniProps[i]]}`}>{prop}<span>:</span></p>
                  <input className={`prop-input ${[aniProps[i]]}`} 
                    type='text' 
                    value={animation.properties[aniProps[i]]}
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
  animation: state.animation
})

export const mapDispatchToProps = (dispatch) => ({
  updateAnimation: (animation) => dispatch(loadAnimation(animation))
})

PropertiesEditor.propTypes = {
  animation: PropTypes.object.isRequired,
  updateAnimation: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesEditor)
