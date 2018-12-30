import React, { Component } from 'react'
import { connect } from 'react-redux'
import animationsData from '../../utils/data'
import { loadAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { PropTypes } from 'prop-types'

const animationKeys = Object.keys(animationsData);

export class Viewer extends Component {
  constructor() {
    super()
    this.state = {
      animation: {},
      play: true
    }
  }

  componentDidMount() {
    this.loadNewAnimation(this.props.currentAnimation)
  }

  loadNewAnimation(animationName) {
    const animationKey = animationKeys.find( key => key === animationName)
    const newAnimation = JSON.parse(JSON.stringify(animationsData[animationKey]))
    this.props.loadNewAnimation(newAnimation)
    CSSInsertion.updateKeyframes(newAnimation.keyframes)
  }

  playAnimation() {
    const { animation } = this.props
    this.setState({
      animation: {
        animation: `${animation.name} ${animation.duration} ${animation.timingFunction} ${animation.delay} ${animation.iterationCount} ${animation.direction}`,
        animationFillMode: `${animation.fillMode}`
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
    const { animation } = this.props
    if  (!animation) {
      return <div></div>
    }
    return (
      <div className='viewer-component'>
        <h2 className='current-animation-label'>*{animation.name}*</h2>
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
  animation: state.animation.properties,
})

export const mapDispatchToProps = (dispatch) => ({
  loadNewAnimation: (animation) => dispatch(loadAnimation(animation))
})

Viewer.propTypes = {
  animation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  loadNewAnimation: PropTypes.func.isRequired,
  currentAnimation: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)