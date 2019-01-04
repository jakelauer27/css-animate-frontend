import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

export class Viewer extends Component {
  constructor() {
    super()
    this.state = {
      animation: {},
      play: true
    }
  }
  
  playAnimation() {
    const { currentAnimation } = this.props
    this.setState({
      animation: {
        animation: `${currentAnimation.name} ${currentAnimation.duration} ${currentAnimation.timingFunction} ${currentAnimation.delay} ${currentAnimation.iterationCount} ${currentAnimation.direction}`,
        animationFillMode: `${currentAnimation.fillMode}`
      },
      play: false
    })
  }

  resetAnimation(waitTime) {
    setTimeout( 
      this.setState({
        animation: {},
        play: true
      })
    , waitTime)
  }

  render() {
    const { currentAnimation } = this.props
    if  (!currentAnimation) {
      return <div></div>
    }
    return (
      <div className='viewer-component'>
        <h2 className='current-animation-label'>*{currentAnimation.name}*</h2>
        <div className='viewer-container'>
          <div className='viewer'>
            <div className='square square-0'
                  style={this.state.animation}
                  onAnimationEnd={() => this.resetAnimation(1000)}>
                <h4 className='main-title'>ani<span>Mate</span></h4>
            </div>
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

export const mapStateToProps = (state) => ({
  currentAnimation: state.currentAnimation.properties
})

Viewer.propTypes = {
  currentAnimation: PropTypes.object
}

export default connect(mapStateToProps)(Viewer)