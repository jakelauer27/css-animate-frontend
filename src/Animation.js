import React, { Component } from 'react';
import './styles/app.scss';

const openCurly = '{';
const closeCurly = '}';
const aniProps = ['name', 'duration', 'timing-function', 'delay', 'iteration-count', 'direction', 'fill-mode']

class Animation extends Component {
  constructor() {
    super();
    this.state = {
      squares: ['a'],
      animation: null
    }
  }

  componentDidMount() {
    this.setState({
      animation: this.props.animationEx
    })
  }

  componentDidUpdate(prevProp) {
    if (prevProp.animationEx !== this.props.animationEx) {
      this.setState({
        animation: this.props.animationEx
      })
    }
  }

  saveForm(e) {
    document.querySelector('.stop-btn').click()
    let newAnimation = Object.assign(this.state.animation);
    newAnimation.properties[e.target.classList[1]] = e.target.value;
    this.setState({
      animation: newAnimation
    })
  }

  saveKeyframes(e) {
    document.querySelector('.stop-btn').click();
    let newAnimation = Object.assign(this.state.animation);
    let stageLabel = e.target.parentElement.parentElement.childNodes[0].classList[1];
    let propLabel = e.target.classList[1];
    let stageIndex = '';
    let propIndex = '';
    newAnimation.keyframes.sections.map( (stage, i) => {
       if (stage.label === stageLabel) {
         stageIndex = i;
       }
    })
    newAnimation.keyframes.sections[stageIndex].properties.map( (prop, i) => {
       if (prop.name === propLabel) {
         propIndex = i;
       }
    })
    newAnimation.keyframes.sections[stageIndex].properties[propIndex].value = e.target.value;
    this.setState({
      animation: newAnimation
    })
    this.props.updateKeyframes(stageIndex, propIndex, e.target.value)
  }

  render() {
    if (!this.state.animation) {
      return <div></div>
    }
    if (this.props.animation) {
      return (
        <div className='animation-container'>
          {
            this.state.squares.map( (square, i) => {
              return (
                <div className='class-container' key={i}>
                  <p className='class-selector'>.square-{square} <span> {openCurly}</span></p>
                  {
                    aniProps.map( (prop, i) => {
                      return (
                        <div className='props-container'>
                          <p className={`ani-prop ${prop}`}>{prop}<span>:</span></p>
                          <input className={`prop-input ${prop}`} 
                            type='text' 
                            value={this.state.animation.properties[prop]}
                            onChange={e => this.saveForm(e)}></input>
                        </div>
                      )
                    })
                  }
                  <p className='close-curly'>{closeCurly}</p>
                </div>
              )
            })
          }
        </div>
      )
    }
    return (
      <div className='keyframes-container'>
        <div className='keyframe'>
          <p className='keyframes-name'><span>@keyframes </span>{this.state.animation.keyframes.name} <span> {openCurly}</span></p>
          {
            this.state.animation.keyframes.sections.map( (section, i) => {
              return (
                <div className='keyframes-section'>
                  <p className={`keyframes-label ${section.label}`}>{section.label} <span> {openCurly}</span></p>
                  {
                    section.properties.map( (prop) => {
                      return (
                        <div className='props-container'>
                          <p className='keyframe-property'>{prop.name}<span>:</span></p>
                          <input className={`keyframe-prop-value ${prop.name}`} 
                            type='text' 
                            value={prop.value}
                            onChange={e => this.saveKeyframes(e)}></input>
                        </div>                   
                        )
                      })
                    }
                  <p className='close-curly'>{closeCurly}</p>
                </div>
              )
            }) 
          }
          <p className='close-curly'>{closeCurly}</p>
        </div>
      </div>
    )
  }
}

export default Animation;