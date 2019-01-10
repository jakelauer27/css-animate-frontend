import React from 'react'
import { shallow } from 'enzyme'
import { PreBuiltAnimationList, mapStateToProps } from '../PreBuiltAnimationList'

describe('PreBuiltAnimationList', () => {
  let mockEvent
  let wrapper
  const mockAnimations = [{id: 1, 'ani-name': 'slideIn' },{id: 2, 'ani-name': 'rotateIn' }]
  const mockCurrentAnimation = {id: 2, 'ani-name': 'rotateIn' }

  beforeEach(() => {
    mockEvent = {target: {classList: ['2', 'test2']}}
    mockEvent.target.classList.add = jest.fn()
    mockEvent.target.classList.remove = jest.fn()
    wrapper = shallow(<PreBuiltAnimationList prebuiltAnimations={mockAnimations} currentAnimation={mockCurrentAnimation} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should run selectAnimation when an animation item is clicked', () => {
    const singleItemMockAnimations = [{id: 1, 'ani-name': 'slideIn' }]
    wrapper = shallow(<PreBuiltAnimationList prebuiltAnimations={singleItemMockAnimations} currentAnimation={mockCurrentAnimation} />)

    const spy = jest.spyOn(wrapper.instance(), 'selectAnimation')
    wrapper.find('.animation-li').simulate('click', mockEvent)
    expect(spy).toHaveBeenCalled()
  })

  describe('selectAnimation', () => {

    it('should remove selected-animation class from all nodes', () => {
      document.querySelectorAll = jest.fn().mockImplementation(() => {
        return [{classList: {remove: jest.fn()}}]
      })
      wrapper.instance().selectAnimation(mockEvent)

      expect(document.querySelectorAll).toHaveBeenCalledWith('.animation-li')
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with a currentAnimation and preBuiltAnimations property', () => {
      const mockState = {prebuiltAnimations: {keyframes: {name: 'slideInX'}}, user:{id: 1}, currentAnimation: {name: 'test'}}
      const expected = {prebuiltAnimations: {keyframes: {name: 'slideInX'}}, currentAnimation: {name: 'test'}}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})