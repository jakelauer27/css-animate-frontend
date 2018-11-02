import React, { Component } from 'react';
import Button from './Button';
import Animation from './Animation'
import './styles/app.scss';
import animations from './data';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      animation: 'selected',
      keyframes: false,
      animations: animations
    }
  }

  selectKeyframes(select) {
    if (select) {
      this.setState({
        animation: false,
        keyframes: 'selected'
      })      
    } else {
      this.setState({
        animation: 'selected',
        keyframes: false
      })
    }
  }
  
  render() {
    return (
      <div className='editor-component'>
        <div className='editor-container'>
          <div className='editor-options'>
            <button className={`animation-btn ${this.state.animation}`}
              onClick={() => this.selectKeyframes(false)}>
              animation
            </button>
            <button className={`keyframes-btn ${this.state.keyframes}`}
              onClick={() => this.selectKeyframes(true)}>
              keyframes
            </button>
          </div>
          <div className='editor'>
            <Animation animation={this.state.animation} 
              animationEx={this.state.animations.slideIn}/>
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <Button title={'copy'}/>
          <Button title={'reset'}/>
        </div>
      </div>
    )
  }
}

export default Editor;