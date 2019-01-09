import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
  
  render() {
    return (
      <div className='error-page'>
      <h2>page not found</h2>
      <Link to='/'>return to site</Link>
    </div>
    )
  }
}

export default Error