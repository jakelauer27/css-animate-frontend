import React, { Component } from 'react';
import '../../styles/app.scss';
import Editor from '../Editor/Editor';
import Viewer from '../Viewer/Viewer';
import HowToPopup from '../../components/HowToPopup/HowToPopup'
import animationsData from '../../utils/data'
import { Route, Switch, Link, withRouter, Redirect} from 'react-router-dom'
import { uid } from 'react-uid'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

const animationKeys = Object.keys(animationsData);

export class App extends Component {

  render() {
    let { animation } = this.props
    if (!animation) {animation = 'slideInX'}
    return (
      <div className="App">
        <header>
          <Link to={`/${animation}/properties/howto/general`}>
            <button className='questions-btn'>Instructions</button>
          </Link>
          <h1 className='main-title'>CSS ani<span>Mate</span></h1>
          <div className='header-btn-container'>
            <button className='load-example-btn'>Load Examples
              <i className="fas fa-caret-right"></i>
            </button>
            <ul className='examples-list'>
              {
                animationKeys.map( keyframe => {
                  return (
                    <Link to={`/${keyframe}/properties`} key={uid(keyframe)}>
                      <li className={`keyframe-ex ${keyframe}`} >{keyframe}</li>
                    </Link>
                  )
                })
              }
            </ul>
          </div>
        </header>
        <Switch>
          <Route exact path='/'
          render={() => <Redirect to='/slideInX/properties'/>}
          />
          {
            animationKeys.map( keyframe => {
              return (
                <Route path={`/${keyframe}`} key={uid(keyframe)} render={() => (
                  <main>
                    <Editor currentAnimation={keyframe} location={this.props.location}/>
                    <Viewer currentAnimation={keyframe}/> 
                  </main>
                )}/>
              )
            })
          }     
        </Switch>
        <Route path={`/${animation}/properties/howto`} component={HowToPopup}/>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  animation: state.animation.keyframes.name 
})

App.propTypes = {
  animation: PropTypes.string
}

export default withRouter(connect(mapStateToProps)(App))

