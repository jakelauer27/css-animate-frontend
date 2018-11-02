import React, { Component } from 'react';
import './styles/app.scss';
import Editor from './Editor';
import Viewer from './Viewer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className='main-title'>CSS Ani-Mate</h1>
          <div className='header-btn-container'>
            <button className='load-example-btn'>Load Example</button>
            <button className='questions-btn'>?</button>
          </div>
        </header>
        <main>
          <Editor />
          <Viewer />
        </main>
      </div>
    );
  }
}

export default App;
