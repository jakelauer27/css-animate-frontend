import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
 
export class CopyPopup extends Component {
  constructor() {
    super()
    this.state = {
      copyKeyframes: false,
      copyProperties: false,
      copyKeyframesText: 'copy',
      copyPropertiesText: 'copy'
    }
  }

  copyPasteKeyframes = () => {
    return (
      <div className='keyframes-popup'>
        <textarea className='keyframe-text' readOnly value={`@keyframes ${this.props.animation.keyframes.name} {
  ${this.getKeyframeStages(this.props.animation.keyframes)}
}`
}>
        </textarea>  
      </div>
    )
  }

  copyPasteAnimation = () => {
    let keys = Object.keys(this.props.animation.properties)
    let props = this.props.animation.properties
    let animation = (
      <div className='animation-popup'>
        <textarea className='animation-text' readOnly value={
            `animation:${
                keys.map((key, i) => {
                  if (i === keys.length -1) {
                    return ''
                  } 
                  return ` ${props[key]}`
                }).join('')}; 
animation-fill-mode: ${props['fill-mode']};`
        }>
        </textarea>
      </div>
    )
    return animation
  }

  getKeyframeStages(keyframe) {
    var obj = keyframe.sections.map( (section, i) => {
      return (
  `${section.label} {
    ${
      section.properties.map( (prop, i) => {
        if (i === 0) {
          return `${prop.name}: ${prop.value};`
        } 
        return (`
    ${prop.name}: ${prop.value};`                
          )
        }).join('')
      }
  }
  `
      )
    }) 
    return obj.join('')
  }

  copySelection = (e) => {
    e.target.previousElementSibling.childNodes[0].select()
    document.execCommand('copy')

    this.setState({
      copyKeyframes: false,
      copyProperties: false,
      copyKeyframesText: 'copy',
      copyPropertiesText: 'copy',
      [e.target.name]: true,
      [e.target.name + 'Text']: 'copied'
    })
  }

  render() {
    const { copyKeyframes, copyProperties, copyKeyframesText, copyPropertiesText } = this.state
    return (
    <div className='copy-paste-popup'>
      <div className='popup-keyframes-container popup-container'>
        <h2 className='copy-popup-label'>Keyframes</h2>
        {
          this.copyPasteKeyframes()
        } 
        <button 
          name='copyKeyframes' 
          className={`copy-code-btn copy-keyframes-btn ${copyKeyframes && 'copied'}`} 
          onClick={this.copySelection}>{copyKeyframesText}
        </button>
      </div>
      <div className='popup-animation-container popup-container'>
        <h2 className='copy-popup-label'>Animation</h2>
        {
          this.copyPasteAnimation()
        } 
        <button 
          name='copyProperties'
          className={`copy-code-btn copy-animation-btn ${copyProperties && 'copied'}`} 
          onClick={this.copySelection}>{copyPropertiesText}
        </button>
      </div>
      <Link to={`/${this.props.currentPage}/properties`}>
        <button className='close-popup-btn'><i className="fas fa-times"></i></button>
      </Link>
    </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  animation: state.animation
})

CopyPopup.propTypes = {
  animation: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CopyPopup)