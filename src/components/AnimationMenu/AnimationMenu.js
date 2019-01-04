import React, { Component } from 'react'
import { MyAnimationList } from '../../containers/AnimationList/MyAnimationList';
import { PreBuiltAnimationList } from '../../containers/AnimationList/PreBuiltAnimationList';
import CreateAnimationForm from '../CreateAnimationForm/CreateAnimationForm';


export default class AnimationMenu extends Component {

  render() {
    return (
      <div className='select-ani-container'>
        <div className='infoPopup-overlay'></div>
        <div className='select-ani-popup'>
          <header className='select-ani-container-header'>
            <h2 className='my-ani-header'>My Animations</h2>
            <h2 className='prebuilt-ani-header'>Prebuilt Templates</h2>
          </header>
          <div className='list-container'>
            <MyAnimationList />
            <PreBuiltAnimationList />
          </div>
          <button className='close-select-ani-btn'>Go!</button>
        </div>
        {/* <CreateAnimationForm /> */}
      </div>
    )
  }
}

