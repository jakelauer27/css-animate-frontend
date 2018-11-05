import React, { Component } from 'react';
import HowToInfo from './HowToInfo.js';
import AnimationInfo from './AnimationInfo.js';
import KeyframesInfo from './KeyframesInfo.js';
import './styles/app.scss';

class InfoPopup extends Component {
  constructor() {
    super();
    this.state = {
      howTo: true,
      keyframes: false,
      animation: false,
    };
    this.keys = Object.keys(this.state);
  }

  renderSection = (e) => {
    const section = e.target.classList[0];
    document.querySelectorAll('.header-button').forEach(button => {
      button.classList.remove('selected-section')
    })

    e.target.classList.add('selected-section');

    this.setState({
      keyframes: false,
      animation: false,
      howTo: false,
      [section]: true
    });
  }
  
  render() {
    if (!this.props.display) {
      return <div></div>
    }
    return (
      <div className="infoPopup-overlay">
        <div className="info-popup">
          <header className="header">
              <button className='howTo header-button selected-section' 
                onClick={this.renderSection}>how to play</button>
              <button className='keyframes header-button' 
                onClick={this.renderSection}>keyframes</button>
              <button className='animation header-button' 
                onClick={this.renderSection}>animation properties</button>
          </header>
          {
            this.keys.map( key => {
              if (this.state[key]) {
                switch (key) {
                case 'howTo':
                  return <HowToInfo key={key} />;
                case 'keyframes':
                  return <KeyframesInfo key={key} />;
                case 'animation':
                  return <AnimationInfo key={key}/>;
                }
              }
            })
          }
        <button className='close-info-popup-btn' 
          onClick={() => this.props.toggleOff(false)}>Go!</button>
        </div>
      </div>
    );
  }
}

export default InfoPopup;