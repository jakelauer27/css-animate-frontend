import React, { Component } from 'react';
import './styles/app.scss';

class Button extends Component {

  render() {
    return (
      <button class={`lower-btn ${this.props.title}-btn`}>
        {this.props.title}
      </button>
    )
  }
}

export default Button;