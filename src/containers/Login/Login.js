import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { loginUser } from '../../thunks/login'
import { getMyAnimations } from '../../thunks/getMyAnimations'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      incorrect: false
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { getMyAnimations, loginUser } = this.props
    const { email, password } = this.state
    const success = await loginUser({email, password})
    if(success.status === 'success') {
      await getMyAnimations(success.data.id)
    } else {
      this.setState({incorrect: true})
    }
  }

  render() {
    const { email, password } = this.state
    const { user } = this.props
    if( user.name ) {
      return (
        <Redirect to='/properties' />
      )
    } 
    
    return (
      <div className='login-container'>
        <div className='infoPopup-overlay'></div>
        <div className='form-container'>
          <h2 className='login-title'>Login</h2>
          <form className='login-form' onSubmit={(e) => this.handleSubmit(e)}>
            <input 
              className='form-input email'
              type='text' 
              placeholder='email' 
              value={email} 
              name='email'
              onChange={this.handleChange}>
            </input>
            <input 
              className='form-input password'
              type='password' 
              placeholder='password' 
              value={password}
              name='password'
              onChange={this.handleChange}>
            </input>
            <button>Login</button>
          </form>
          <div className='new-account-container'>
            <h3 className={`incorrect-login ${this.state.incorrect && 'incorrect'}`}>username or password is incorrect</h3>
            <h3>Don't have an account?</h3>
            <Link className='form-link' to='/properties/signup' >Create New Account</Link>
            <Link className='form-link continue-as-guest' to='/properties' >Continue as Guest</Link>
          </div>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({ 
  loginUser: (user) => dispatch(loginUser(user)),
  getMyAnimations: (id) => dispatch(getMyAnimations(id))
})

export const mapStateToProps = (state) => ({ 
  user: state.user
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  getMyAnimations: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)