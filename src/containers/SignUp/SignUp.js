import React, { Component } from 'react'
import { addUser } from '../../utils/apiCalls/apiCalls'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../thunks/login'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { PropTypes } from 'prop-types'

export class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      duplicateUser: false,
      validUser: false,
      formComplete: false,
      passwordsMatch: true,
      validEmail: true
    }
  }

  emailValidation = (email) => {
    var regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(.)[a-zA-Z]{2,4}$');
    var emailInput = email;
    if (emailInput.match(regex)) {
      return true
    } else {
      return false;
    }
  }

  handleChange = async (e) => {
    const { name, value } = e.target
    await this.setState({
      [name]: value,
    })
    this.checkFormCompletion()
  }

  checkFormCompletion() {
    const { name, email, password, confirmPassword } = this.state
    this.setState({
      formComplete: (name !== '' && email !== '' && password !== '' && confirmPassword !== '')
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { getMyAnimations, loginUser } = this.props 
    const { name, email, password, confirmPassword } = this.state
    const emailInputVal = email
    if (!this.emailValidation(emailInputVal)) {
      this.setState({ validEmail: false, duplicateUser: false, passwordsMatch: true})
      return
    }
    if (password !== confirmPassword) {
      this.setState({ duplicateUser: false, passwordsMatch: false, validEmail: true })
      return
    }
    const data = await addUser({ name, email, password }) 

    if (data.error) {
      this.setState({ duplicateUser: true, passwordsMatch: true, validEmail: true})
    } else {
      const success = await loginUser({email, password})
      await getMyAnimations(success.data.id)
      this.setState({ validUser: true})
    }
  }

  render() {
    const { name, email, password, confirmPassword, validUser, formComplete, duplicateUser, passwordsMatch, validEmail} = this.state
    if (validUser) {
     return <Redirect to='/properties' />
    }
    return(
      <div className="sign-up-container">
        <div className='infoPopup-overlay'></div>
        <div className='form-container'>
          <h2 className='login-title'>Sign Up</h2>
          <form className='login-form create-new-user-form' onSubmit={this.handleSubmit}>
            <input 
              onChange={this.handleChange}
              type='text'
              placeholder='name'
              name='name'
              value={name}
              />
            <input 
              onChange={this.handleChange}
              type='text'
              placeholder='email'
              name='email'
              value={email}
              />
            <input 
              onChange={this.handleChange}
              type='password'
              placeholder='password'
              name='password'
              value={password}
              />
            <input 
              onChange={this.handleChange}
              type='password'
              placeholder='confirm password'
              name='confirmPassword'
              value={confirmPassword}
              />
            <button disabled={!formComplete}>Submit</button>
            <Link className='form-link' to='/properties/login' >Return to login</Link>
          </form>
          <h3 className={`duplicate-user-message ${duplicateUser && 'create-user-error'}`}>An account already exists with that email</h3>
          <h3 className={`passwords-message ${!passwordsMatch && 'create-user-error'}`}>Passwords must match</h3>
          <h3 className={`passwords-message ${!validEmail && 'create-user-error'}`}>Please enter a valid e-mail</h3>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({ 
  loginUser: (user) => dispatch(loginUser(user)),
  getMyAnimations: (id) => dispatch(getMyAnimations(id))
})

SignUp.propTypes = {
  loginUser: PropTypes.func.isRequired,
  getMyAnimations: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignUp)