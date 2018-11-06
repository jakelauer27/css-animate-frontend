import React, { Component } from 'react';
import Animation from './Animation'
import CopyPopup from './CopyPopop';
import './styles/app.scss';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      animation: 'selected',
      keyframes: false,
      animationEx: null,
      popup: false
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

  renderPopup() {
    this.setState({
      popup: true
    })
  }

  closePopup = () => {
    this.setState({
      popup: false
    })
  }

  componentDidMount() {
    this.setState({
      animationEx: this.props.animation
    })
  }

  componentDidUpdate(prevProp) {
    if (prevProp.animation !== this.props.animation) {
      this.setState({
        animationEx: this.props.animation
      })
    }
  }
  
  render() {
    if (!this.state.animationEx) {
      return <div></div>
    }
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
              animationEx={this.state.animationEx}
              updateKeyframes={(stageIndex, propIndex, value, newAnimation) => this.props.updateKeyframes(stageIndex, propIndex, value, newAnimation)}
              updateKeyframesStages={(stageIndex, value, newAnimation) => this.props.updateKeyframesStages(stageIndex, value, newAnimation)}
              updateAnimationProperties={(newAnimation) => this.props.updateAnimationProperties(newAnimation)}/>
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <CopyPopup animation={this.state.animationEx}
              active={this.state.popup}
              closePopup={this.closePopup}/>
          <button className={`lower-btn copy-btn`} onClick={() => this.renderPopup()}>
            copy code
          </button>
          <button class={`lower-btn reset-btn`} onClick={() => this.props.reset()}>
            reset
          </button>
        </div>
      </div>
    )
  }
}

export default Editor;