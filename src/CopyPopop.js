import React, { Component } from 'react';
import './styles/app.scss';

class CopyPopup extends Component {

  copyPasteKeyframes = () => {
    let keyframes = `@keyframes ${this.props.animation.properties.name} 
    ${this.getKeyframeStages(this.props.animation.keyframes)}`;
    return keyframes;
  }

  copyPasteAnimation = () => {
    let keys = Object.keys(this.props.animation.properties)
    let props = this.props.animation.properties;
    let animation = `animation: ${
      keys.reduce((animation, key, i) => {
        if (i === keys.length -1) {
          animation += `; animation-fill-mode: ${props[key]}`;
        } else {
          animation += props[key] + ' ';
        }
        return animation;
      }, '')
    };`
    return animation;
  }

  getKeyframeStages(keyframe) {
    var obj = keyframe.sections.reduce( (stages, section, i) => {
      let sectionProps = section.properties.reduce( (propsObj, prop, i) => {
        if (i === section.properties.length - 1) {
          return `${propsObj} ${prop.name}: ${prop.value};}`
        }
        return `${propsObj} ${prop.name}: ${prop.value};` ;
      }, `{`)
      if (i === keyframe.sections.length - 1) {
        return stages + section.label + sectionProps + "}"
      }
      return stages + section.label + sectionProps
    }, "{")
    return obj
  }

  
  render() {
    if (!this.props.active) {
      return <div></div>
    }
    return (
    <div className='copy-paste-popup'>
      <h2>Keyframes</h2>
      {
        <p>{this.copyPasteKeyframes()}</p>
      } 
      <h2>Animation</h2>
      {
        <p>{this.copyPasteAnimation()}</p>
      } 
      <button className='close-popup-btn' onClick={() => this.props.closePopup()}>close</button>
    </div>
    )
  }
}

export default CopyPopup;