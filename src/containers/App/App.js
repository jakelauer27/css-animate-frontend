import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { getPrebuiltAnimations } from '../../thunks/getPrebuiltAnimations'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { routes } from '../../utils/routes'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import AnimationMenu from '../AnimationMenu/AnimationMenu'
import Editor from '../Editor/Editor'
import Error from '../../components/Error/Error'
import Header from '../Header/Header'
import HowToPopup from '../../components/HowToPopup/HowToPopup'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import Viewer from '../Viewer/Viewer'
import '../../styles/app.scss'

export class App extends Component {
  
  async componentDidMount() {
    const { getPrebuiltAnimations, user_id, getMyAnimations } = this.props
    await getPrebuiltAnimations()
    this.loadInitialAnimation()
    if(user_id) {
      await getMyAnimations(user_id)
    }
  }

  loadInitialAnimation() {
    const { updateCurrentAnimation, prebuiltAnimations, saveOriginalAnimation } = this.props
    updateCurrentAnimation({...prebuiltAnimations[0]})
    saveOriginalAnimation(JSON.stringify({...prebuiltAnimations[0]}))
    CSSInsertion.updateKeyframes({...prebuiltAnimations[0].keyframes}) 
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' render={() => {
            return <Redirect to='/properties'/>
          }} />
          <Route path={`/properties`}
          render={() => {
            return ( 
              <main>
                <Editor location={this.props.location}/>
                <Viewer /> 
              </main>
            )
            }}/>   
          <Route path={`/keyframes`}
          render={() => {
            return ( 
              <main>
                <Editor location={this.props.location}/>
                <Viewer /> 
              </main>
            )
            }}/>   
          <Route path={'/error'} component={Error} />
        </Switch>
        <Route path={`/properties/howto`} component={HowToPopup}/>
        <Route path={`/properties/login`} component={Login}/>
        <Route path={`/properties/signup`} component={SignUp}/>
        <Route path={`/properties/selectAnimation`} component={AnimationMenu} />
        <Route exact path='*' render={() => {
          if(!routes.find(route => route === this.props.location.pathname)) {
            return <Redirect to='/error'/>  
          } else return null
        }} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  prebuiltAnimations: state.prebuiltAnimations,
  user_id: state.user.id
})

export const mapDispatchToProps = (dispatch) => ({
  getPrebuiltAnimations: () => dispatch(getPrebuiltAnimations()),
  updateCurrentAnimation: (animation) => dispatch(updateCurrentAnimation(animation)),
  saveOriginalAnimation: (animation) => dispatch(saveOriginalAnimation(animation)),
  getMyAnimations: (id) => dispatch(getMyAnimations(id))
})

App.propTypes = {
  prebuiltAnimations: PropTypes.array,
  user_id: PropTypes.number,
  getPrebuiltAnimations: PropTypes.func.isRequired,
  updateCurrentAnimation: PropTypes.func.isRequired,
  saveOriginalAnimation: PropTypes.func.isRequired,
  getMyAnimations: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

