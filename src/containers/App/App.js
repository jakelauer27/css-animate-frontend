import React, { Component } from 'react'
import '../../styles/app.scss'
import Editor from '../Editor/Editor'
import Viewer from '../Viewer/Viewer'
import HowToPopup from '../../components/HowToPopup/HowToPopup'
import AnimationMenu from '../../components/AnimationMenu/AnimationMenu'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Login from '../Login/Login'
import SignUp from '../../components/SignUp/SignUp'
import Header from '../Header/Header'
import { getPrebuiltAnimations } from '../../thunks/getPrebuiltAnimations'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'

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
    let { animation } = this.props
    if (!animation) {animation = 'slideInX'}
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
        </Switch>
        <Route path={`/properties/howto`} component={HowToPopup}/>
        <Route path={`/properties/login`} component={Login}/>
        <Route path={`/properties/signup`} component={SignUp}/>
        <Route path={`/properties/selectAnimation`} component={AnimationMenu} />
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
  prebuiltAnimation: PropTypes.array,
  getPrebuiltAnimations: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

