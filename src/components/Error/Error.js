import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
  
  render() {
    return (
      <div className='error-page'>
        <h1 className='error-main-message'>OOPS!</h1>
        <h2 className='error-secondary-message'>page not found</h2>
        <Link to='/' className='return-to-site-link lower-btn'>return to site</Link>
      </div>
    )
  }
}

export default Error