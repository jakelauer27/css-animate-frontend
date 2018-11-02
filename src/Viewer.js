import React, { Component } from 'react';
import Button from './Button';
import './styles/app.scss';

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      items: ['A']
    }
  }

  render() {
    return (
      <div className='viewer-component'>
      <div className='viewer-container'>
        <div className='viewer'>
          {
            this.state.items.map((item, i) => {
              return (
                <div className={`square square-${i}`} key={i}>
                  {item} 
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='viewer-bottom-btns-container'>
        <Button title={'play'}/>
        <Button title={'stop'}/>
      </div>
    </div>
    )
  }
}

export default Viewer;