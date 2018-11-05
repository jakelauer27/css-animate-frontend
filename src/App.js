import React, { Component } from 'react';
import './styles/app.scss';
import Editor from './Editor';
import Viewer from './Viewer';
import animationsData from './data';
import InfoPopup from './infoPopup';

const keyframes = Object.keys(animationsData);
var sheet = document.styleSheets[4];

class App extends Component {
  constructor() {
    super();
    this.state = {
      animations:  JSON.parse(JSON.stringify(animationsData)),
      animation:  JSON.parse(JSON.stringify(animationsData)).slideInX,
      original:  JSON.parse(JSON.stringify(animationsData)).slideInX,
      infoPopup: false
    }
  }

  chooseExample(e) {
    this.setState({
      animation: this.state.animations[e.target.innerText],
      original: JSON.parse(JSON.stringify(this.state.animations[e.target.innerText]))
    })
  }

  componentDidMount() {
    this.loadKeyframes()
    document.querySelector('.slideInX').click()
  }

  ////////INSERTING KEYFRAMES TO CSS

  loadKeyframes() {
    keyframes.forEach( (keyframe) => {
      let key = this.state.animations[keyframe].keyframes;
      sheet.insertRule(`@keyframes ${key.name} 
        ${this.getKeyframeStages(key)}`, sheet.length)
    })
  }

  updateKeyframes = (stageIndex, propIndex, value) => {
    let name = this.state.animation.properties.name  
    let ruleKeys = Object.keys(sheet.cssRules)
    let keyframeToDeleteIndex = ruleKeys.find(rule => {
      return sheet.cssRules[rule].name === name;
    })
    let formattedRule = this.formatKeyframes(stageIndex, propIndex, value);

    sheet.deleteRule(keyframeToDeleteIndex)
    sheet.insertRule(formattedRule, sheet.length)
  }

  updateKeyframesStages = (stageIndex, value) => {
    let name = this.state.animation.properties.name  
    let ruleKeys = Object.keys(sheet.cssRules)
    let keyframeToDeleteIndex = ruleKeys.find(rule => {
      return sheet.cssRules[rule].name === name;
    })
    let formattedRule = this.formatKeyframesStages(stageIndex, value);

    sheet.deleteRule(keyframeToDeleteIndex)
    sheet.insertRule(formattedRule, sheet.length)
  }

  formatKeyframesStages(stageIndex, value) {
    let name = this.state.animation.properties.name
    let updatedRule = this.state.animations[name].keyframes;

    updatedRule.sections[stageIndex].label = value;
    
    let formattedRule = `@keyframes ${updatedRule.name} 
    ${this.getKeyframeStages(updatedRule)}`;
    return formattedRule
  }


  formatKeyframes(stageIndex, propIndex, value) {
    let name = this.state.animation.properties.name
    let updatedRule = this.state.animations[name].keyframes;

    updatedRule.sections[stageIndex].properties[propIndex].value = value;
    
    let formattedRule = `@keyframes ${updatedRule.name} 
    ${this.getKeyframeStages(updatedRule)}`;
    return formattedRule
  }

  getKeyframeStages(keyframe) {
    var obj = keyframe.sections.reduce( (stages, section, i) => {
      let sectionProps = section.properties.reduce( (propsObj, prop, i) => {
        if (i === section.properties.length - 1) {
          return `${propsObj} ${prop.name}: ${prop.value};}`
        }
        return `${propsObj} ${prop.name}: ${prop.value};` ;
      }, `{`)
      if (i === keyframe.sections.length - 1) {
        return stages + section.label + sectionProps + "}"
      }
      return stages + section.label + sectionProps
    }, "{")
    return obj
  }

  toggleInfoPopup = (toggle) => {
    this.setState({
      infoPopup: toggle
    })
  }

  ///////////////////////////////////////

  reset = () => {
    this.setState({
      original: JSON.parse(JSON.stringify(this.state.original)),
      animation: JSON.parse(JSON.stringify(this.state.original))
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className='main-title'>CSS ani<span>Mate</span></h1>
          <div className='header-btn-container'>
            <button className='load-example-btn'>Load Examples
              <i className="fas fa-caret-right"></i>
            </button>
            <ul className='examples-list'>
              {
                keyframes.map( (keyframe, i) => {
                  return (
                    <li className={`keyframe-ex ${keyframe}`} 
                        key={i}
                        onClick={e => this.chooseExample(e)}>{keyframe}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <button className='questions-btn'
            onClick={() => this.toggleInfoPopup(true)}>?</button>
          <InfoPopup display={this.state.infoPopup}
            toggleOff={this.toggleInfoPopup}/>
        </header>
        <main>
          <Editor animation={this.state.animation}
            updateKeyframes={this.updateKeyframes}
            updateKeyframesStages={this.updateKeyframesStages}
            reset={this.reset}/>
          <Viewer animation={this.state.animation.properties}/>
        </main>
      </div>
    );
  }
}

export default App;


  // resetRule() {
  //   console.log('hi')
  //   let name = this.state.animation.properties.name  
  //   let ruleKeys = Object.keys(sheet.cssRules)
  //   let keyframeToDeleteIndex = ruleKeys.find(rule => {
  //     return sheet.cssRules[rule].name === name;
  //   })
  //   sheet.deleteRule(keyframeToDeleteIndex)
  //   sheet.insertRule(this.state.animation.keyframes, sheet.length)
  // }