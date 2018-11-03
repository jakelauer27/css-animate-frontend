import React, { Component } from 'react';
import './styles/app.scss';
import Editor from './Editor';
import Viewer from './Viewer';
import animations from './data';

const keyframes = Object.keys(animations)

class App extends Component {
  constructor() {
    super();
    this.state = {
      animation: animations.rotateIn
    }
  }

  chooseExample(e) {
    this.setState({
      animation: animations[e.target.innerText]
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className='main-title'>CSS Ani-Mate</h1>
          <div className='header-btn-container'>
            <button className='load-example-btn'>Load Examples</button>
              <ul className='examples-list'>
                {
                  keyframes.map( (keyframe, i) => {
                    return (
                      <li className='keyframe-ex' 
                          key={i}
                          onClick={e => this.chooseExample(e)}>{keyframe}
                      </li>
                    )
                  })
                }
              </ul>
            <button className='questions-btn'>?</button>
          </div>
        </header>
        <main>
          <Editor animation={this.state.animation}/>
          <Viewer animation={this.state.animation.properties}/>
        </main>
      </div>
    );
  }
}

export default App;
