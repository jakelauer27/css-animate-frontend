import React, { Component } from 'react';
import './app.scss';
import CodeMirror from 'react-codemirror';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CodeMirror />
      </div>
    );
  }
}

export default App;
