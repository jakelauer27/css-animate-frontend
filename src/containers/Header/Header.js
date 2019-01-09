import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { signOut } from '../../actions/actions'

export class Header extends Component {

  render() {
    const { user, signOut } = this.props
    let greeting = ''
    let login = 'Login'
    if (user.name) {
      login = 'Logout'
      greeting = `Hi ${user.name}!`
    }

    return (
      <header>
        <h1 className='main-title'>CSS ani<span>Mate</span></h1>
        <div className='header-btn-container'>
        <Link to={`properties/selectAnimation`}>
          <button className='load-example-btn'>Load Animation</button>
        </Link>
        </div>
        <div className='inst-log-container'>
          <h3 className='user-greeting'>{greeting}</h3>
          <Link to={`properties/howto/general`}>
            <button className='questions-btn'>Instructions</button>
          </Link>
          <Link to='properties/login'>
            <button className='login-btn' onClick={() => signOut()}>{login}</button>
          </Link>
        </div>
      </header>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

Header.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))