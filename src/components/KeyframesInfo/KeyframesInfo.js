import React, { Component } from 'react';

class KeyframesInfo extends Component {
  
  render() {
    return (
      <div className="keyframes-info info-section">
        <div className='main-keyframes-info'>
          <h1 className='title'>Keyframes</h1>
          <p className='keyframes-body'>The @keyframes rule defines the animation code. 
            The animation is set by gradually changing any 
            number of css styles.  While most css properties 
            can be animated, the most common animatable property 
            is <i>transform.</i></p>
        </div>
        <div className='keyframes-info-example'>
          <h1 className='title'>@keyframes</h1>
          <div className='code-container'>
            <p className='pink-code code'>@keyframes
              <span>example</span>
              <span className='punctuation'>{'{'}</span>
            </p>
            <p className='yellow-code code indent1'>from 
              <span className='punctuation'>{'{'}</span>
            </p>
            <p className='yellow-code code indent2'>color 
              <span className='colon'>:</span>
              <span className='blue-code'>blue</span>
            </p>
            <p className='code indent1'>{'}'}</p>
            <p className='yellow-code code indent1'>to
              <span className='punctuation'>{'{'}</span>
            </p>
            <p className='yellow-code code indent2'>color 
              <span className='colon'>:</span>
              <span className='blue-code'>red</span>
            </p>
            <p className='code indent1'>{'}'}</p>
            <p className='code'>{'}'}</p>
          </div>
        </div>
        <div className='transform-example'>
          <h1 className='title'>transform:</h1>
          <div className='transformations-container'>
            <ul className='transform-group'>
              <li>translateX(<span>px || %</span>)</li>
              <li>translateY(<span>px || %</span>)</li>
              <li>translate(<span>x, y</span>)</li>
            </ul>
            <ul className='transform-group'>
              <li>skewX(<span>deg</span>)</li>
              <li>skewY(<span>deg</span>)</li>
              <li>skew(<span>x-deg, y-deg</span>)</li>
            </ul>
            <ul className='transform-group'>
              <li>rotateX(<span>deg</span>)</li>
              <li>rotateY(<span>deg</span>)</li>
              <li>rotate(<span>x-deg, y-deg</span>)</li>
            </ul>
            <ul className='transform-group'>
              <li>scaleX(<span>num || %</span>)</li>
              <li>scaleY(<span>num || %</span>)</li>
              <li>scale(<span>num || %</span>)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default KeyframesInfo