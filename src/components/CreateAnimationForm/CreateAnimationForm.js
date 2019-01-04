import React, { Component } from 'react'
import { uid } from 'react-uid'

export default class CreateAnimationForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      duration: '',
      timing_function: '',
      delay: '',
      iteration_count: '',
      direction: '',
      fill_mode: '',
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='create-animation-form-container'>
        <h2>Create/Edit Animation</h2>
        <label className='secondary-label'>Properties</label>
        <div className='underline'></div>
        <form className='create-animation-form'>
          {
            Object.keys(this.state).map( property => {
              return (
                <div className='form-item' key={uid(property)}>
                  <label htmlFor='property' className='create-label'>{property}</label>
                  <input 
                    type='text' 
                    value={this.state[property]} 
                    name={property}
                    onChange={this.handleChange}>
                  </input>
                </div>
          
              )
            })
          }
        </form>
      </div>
    )
  }
}

