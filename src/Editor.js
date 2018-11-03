import React, { Component } from 'react';
import Animation from './Animation'
import './styles/app.scss';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      animation: 'selected',
      keyframes: false,
      animationEx: null
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
              updateKeyframes={(stageIndex, propIndex, value) => this.props.updateKeyframes(stageIndex, propIndex, value)}/>
          </div>
        </div>
        <div className='editor-bottom-btns-container'>
          <button class={`lower-btn copy-btn`}>
            copy
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