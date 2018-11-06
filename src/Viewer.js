import React, { Component } from 'react';
import './styles/app.scss';

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      items: ['A'],
      animation: {},
      play: true
    }
  }

  componentDidUpdate(prevProp) {
    if (prevProp.animation !== this.props.animation) {
      this.setState({
        animation: {},
        play: true
      })
    }
  }

  playAnimation() {
    this.setState({
      animation: {
        animation: `${this.props.animation.name} ${this.props.animation.duration} ${this.props.animation['timing-function']} ${this.props.animation.delay} ${this.props.animation['iteration-count']} ${this.props.animation.direction}`,
        animationFillMode: `${this.props.animation['fill-mode']}`
      },
      play: false
    })
  }

  resetAnimation(waitTime) {
    setTimeout( () => {
      this.setState({
        animation: {},
        play: true
      })
    }, waitTime)
  }

  render() {
    return (
      <div className='viewer-component'>
      <h2 className='current-animation-label'>*{this.props.animation.name}*</h2>
      <div className='viewer-container'>
        <div className='viewer'>
          {
            this.state.items.map((item, i) => {
              return (
                <div className={`square square-${i}`} 
                     key={i}
                     style={this.state.animation}
                     onAnimationEnd={() => this.resetAnimation(1000)}>
                    <h4 className='main-title'>ani<span>Mate</span></h4>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='editor-bottom-btns-container'>
        <button className={`lower-btn play-btn`} 
          onClick={() => this.playAnimation()}
          disabled={!this.state.play}>play</button>
        <button className={`lower-btn stop-btn`} 
          onClick={() => this.resetAnimation(0)}
          disabled={this.state.play}>stop</button>
      </div>
    </div>
    )
  }
}

export default Viewer;