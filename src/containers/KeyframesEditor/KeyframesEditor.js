import React, { Component } from 'react'
import * as formValidation from '../../utils/formValidators'
import { connect } from 'react-redux'
import { loadAnimation } from '../../actions/actions'
import { updateKeyframes } from '../../utils/keyframesInsertion'

class KeyframesEditor extends Component {

  saveKeyframesStages(e) {
    formValidation.keyframeStage(e.target, e.target.value)
    document.querySelector('.stop-btn').click()
    let newAnimation = JSON.stringify(JSON.parse(this.props.animation))
    let stageLabel = e.target.classList[1]
    let stageIndex = ''
    newAnimation.keyframes.sections.forEach( (stage, i) => {
       if (stage.name === stageLabel) {
         stageIndex = i
       }
    })
    newAnimation.keyframes.sections[stageIndex].label = e.target.value || '%'
    this.props.updateKeyframesStages(stageIndex, e.target.value, newAnimation)
    updateKeyframes(newAnimation.keyframes)
  }

  saveKeyframesProps(e) {
    formValidation.keyframeValue(e.target, e.target.value)
    document.querySelector('.stop-btn').click()
    let newAnimation = {...this.props.animation}
    let stageLabel = e.target.parentElement.parentElement.childNodes[0].classList[1]
    let propLabel = e.target.classList[1]
    let stageIndex = ''
    let propIndex = ''
    newAnimation.keyframes.sections.forEach( (stage, i) => {
       if (stage.name === stageLabel) {
         stageIndex = i
       }
    })
    newAnimation.keyframes.sections[stageIndex].properties.forEach( (prop, i) => {
       if (prop.name === propLabel) {
         propIndex = i
       }
    })
    newAnimation.keyframes.sections[stageIndex].properties[propIndex].value = e.target.value
    this.props.updateAnimation(newAnimation)
    updateKeyframes(newAnimation.keyframes)
  }

  render() {
    const { animation } = this.props
    if (!animation.keyframes) {
      return <div></div>
    }
    return (
      <div className='keyframes-container'>
        <div className='keyframe'>
          <p className='keyframes-name'><span>@keyframes </span>{animation.keyframes.name} <span> {'{'}</span></p>
          {
            animation.keyframes.sections.map( (section, i) => {
              return (
                <div className='keyframes-section' key={i}>
                  <input className={`keyframes-label ${section.name}`} 
                    value={section.label} 
                    type='text'
                    onChange={e => this.saveKeyframesStages(e)}/> 
                    <span> {'{'}</span>
                  {
                    section.properties.map( (prop, i) => {
                      return (
                        <div className='props-container' key={i}>
                          <p className='keyframe-property'>{prop.name}<span>:</span></p>
                          <input className={`keyframe-prop-value ${prop.name}`} 
                            type='text' 
                            value={prop.value}
                            onChange={e => this.saveKeyframesProps(e)}></input>
                        </div>                   
                        )
                      })
                    }
                  <p className='close-curly'>{'}'}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(KeyframesEditor)