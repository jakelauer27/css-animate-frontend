import React, {Component} from 'react'

export class PreBuiltAnimationList extends Component {
 
  render() {
    return (
      <section className='prebuilt-animation-section'>
        <ul className= 'prebuilt-animation-list'>
          <li className='animation-li'>
            <p className='animation-title'>SlideIn</p>
            <div className='icon-container'>  
              <i className="fas fa-edit"></i>
              <i className="fas fa-trash-alt"></i>
            </div>
          </li>
        </ul>
      </section>
    )
  }
}