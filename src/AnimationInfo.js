import React, { Component } from 'react';
import './styles/app.scss';

class AnimationInfo extends Component {
  
  render() {
    return (
      <div className='animation-info info-section'>
        <div className='ani-popup-property-container'>
          <h1 className='title'>Property</h1>
          <ul className='ani-popup-prop-list'>
            <li>animation-name:</li>
            <li>animation-duration:</li>
            <li>animation-timing-function:</li>
            <li>animation-delay:</li>
            <li>animation-iteration-count:</li>
            <li>animation-direction:</li>
            <li>animation-fill-mode:</li>
          </ul>
        </div>
        <div className='ani-popup-value-container'>
          <h1 className='title'>Value</h1>
          <ul className='ani-popup-value-list'>
            <li>name of keyframes animation</li>
            <li>seconds<span>|</span>milliseconds - (.3s<span>|</span>300ms)</li>
            <li>ease<span>|</span>linear<span>|</span>ease-in<span>|</span>ease-out<span>|</span>ease-in-out</li>
            <li>seconds<span>|</span>milliseconds - (3s<span>|</span>500ms)</li>
            <li>number<span>|</span>infinite - (3<span>|</span>infinite)</li>
            <li>normal<span>|</span>reverse<span>|</span>alternate<span>|</span>alternate-reverse</li>
            <li>none<span>|</span>forwards<span>|</span>backwards<span>|</span>both</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AnimationInfo
