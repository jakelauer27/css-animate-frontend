import React, { Component } from 'react';
import './styles/app.scss';

class CopyPopup extends Component {

  copyPasteKeyframes = () => {
    return (
      <div className='keyframes-popup'>
        <textarea className='keyframe-text' readOnly value={`@keyframes ${this.props.animation.keyframes.name} {
  ${this.getKeyframeStages(this.props.animation.keyframes)}
}`
}>
        </textarea>  
      </div>
    );
  }

  copyPasteAnimation = () => {
    let keys = Object.keys(this.props.animation.properties)
    let props = this.props.animation.properties;
    let animation = (
      <div className='animation-popup'>
        <textarea className='animation-text' readOnly value={
            `animation:${
                keys.map((key, i) => {
                  if (i === keys.length -1) {
                    return ';'
                  } 
                  return ` ${props[key]}`
                }).join('')} 
animation-fill-mode: ${props['fill-mode']};`
        }>
        </textarea>
      </div>
    )
    return animation;
  }

  getKeyframeStages(keyframe) {
    var obj = keyframe.sections.map( (section, i) => {
      return (
  `${section.label} {
    ${
      section.properties.map( (prop) => {
        return (
          `${prop.name}: ${prop.value};`                
          )
        })
      }
  }
  `
      )
    }) 
    return obj.join('')
  }

  copySelection(e) {
    document.querySelectorAll('.copy-code-btn').forEach( btn => {
      btn.innerText = 'copy';
      btn.classList.remove('copied');
    })

    e.target.previousElementSibling.childNodes[0].select();
    document.execCommand('copy');
    e.target.innerText = 'copied!';
    e.target.classList.add('copied');
  }

  render() {
    if (!this.props.active) {
      return <div></div>
    }
    return (
    <div className='copy-paste-popup'>
      <div className='popup-keyframes-container popup-container'>
        <h2 className='copy-popup-label'>Keyframes</h2>
        {
          this.copyPasteKeyframes()
        } 
        <button className='copy-code-btn copy-keyframes-btn' onClick={this.copySelection}>copy</button>
      </div>
      <div className='popup-animation-container popup-container'>
        <h2 className='copy-popup-label'>Animation</h2>
        {
          this.copyPasteAnimation()
        } 
        <button className='copy-code-btn copy-animation-btn' onClick={this.copySelection}>copy</button>
      </div>
      <button className='close-popup-btn' onClick={() => this.props.closePopup()}><i className="fas fa-times"></i></button>
    </div>
    )
  }
}

export default CopyPopup;