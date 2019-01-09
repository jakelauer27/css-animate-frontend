import { loadAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import React from 'react'
import { Viewer, mapStateToProps, mapDispatchToProps } from './Viewer'
import { shallow } from 'enzyme'

jest.mock('../../utils/keyframesInsertion')

describe('Viewer', () => {
  let wrapper
  const mockAnimation = {
      'name': 'slideInX',
      'duration': '1.5s',
      'timingFunction': 'ease',
      'delay': '0s',
      'iterationCount': '1',
      'direction': 'normal',
      'fillMode': 'forwards'
  }

  beforeEach(() => {
    wrapper = shallow(<Viewer currentAnimation={mockAnimation} />)
  })

  it('Should match the snapshot' , () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot if no animation' , () => {
    wrapper = shallow(<Viewer currentAnimation={null} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('the play button should trigger playAnimation method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'playAnimation')
    wrapper.find('.play-btn').simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  it('the reset button should trigger resetAnimation method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetAnimation')
    wrapper.find('.stop-btn').simulate('click')
    expect(spy).toHaveBeenCalledWith(0)
  })

  it('animationEnd should trigger resetAnimation method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetAnimation')
    wrapper.find('.square').simulate('animationEnd')
    expect(spy).toHaveBeenCalledWith(1000)
  })

  describe('playAnimation', () => {

    it('should set play to false in state', () => {
      const expected = false
      wrapper.instance().playAnimation()
      expect(wrapper.state().play).toEqual(expected)
    })

    it('should set animation to the short hand version of the passed in animation', () => {
      const expected = {"animation": "slideInX 1.5s ease 0s 1 normal", "animationFillMode": "forwards"}
      wrapper.instance().playAnimation()
      expect(wrapper.state().animation).toEqual(expected)
    })
  })

  describe('resetAnimation', () => {

    jest.useFakeTimers();
    
    it('should set play to true after waiting the specified time', () => {
      const expected = true
      wrapper.instance().resetAnimation(1)
      expect(wrapper.state().play).toEqual(expected)
    })

    it('should call setTimeout with this.setState', () => {
      wrapper.instance().resetAnimation(1)
      expect(setTimeout).toHaveBeenCalled()
      expect(setTimeout).toHaveBeenCalledWith(wrapper.instance().setState(), 1)
    })

    it('should set animation to an empty object after waiting the specified time', () => {
      const expected = {}
      wrapper.instance().resetAnimation(1)
      expect(wrapper.state().animation).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with an animation property', () => {
      const mockState = {currentAnimation: mockAnimation}
      const expected = {currentAnimation: mockAnimation.properties}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

})