import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export class MyAnimationList extends Component {
 
  render() {
    return (
      <section className='my-animation-section'>
        <ul className='animation-list'>
          <li className='animation-li'>
            SlideIn
            <div className='icon-container'>  
              <i className="fas fa-edit"></i>
              <i className="fas fa-trash-alt"></i>
            </div>
          </li>
          <Link to='/properties/selectAnimation/create'>
            <i className="fas fa-plus-circle"><p>Add New</p></i>
          </Link>
        </ul>
      </section>
    )
  }
}