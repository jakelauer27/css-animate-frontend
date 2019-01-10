import React from 'react'
import { shallow } from 'enzyme'
import { AnimationMenu, mapStateToProps, mapDispatchToProps } from './AnimationMenu'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'

jest.mock('../../utils/keyframesInsertion')
  let mockCurrentAnimation = {id: 1, user_id: 2, properties: [], keyframes: []}
  const mockPrebuiltAnimations = [{id: 3, user_id: null, properties: [], keyframes: []}, {id: 4, user_id: null, properties: [], keyframes: []}]
  const mockMyAnimations = [{id: 1, user_id: 2, properties: [], keyframes: []}, {id: 2, user_id: 2, properties: [], keyframes: []}]
  let mockAnimationForEdit 
  let mockLoadAnimation
  let mockSaveOriginalAnimation
  let wrapper

  beforeEach(() => {
    document.querySelector = jest.fn().mockImplementation(() => ({
      classList: ['', 2]
    }))
    mockLoadAnimation = jest.fn()
    mockSaveOriginalAnimation = jest.fn()
    mockAnimationForEdit = {}
    wrapper = shallow(
      <AnimationMenu 
        myAnimations={mockMyAnimations}
        prebuiltAnimations={mockPrebuiltAnimations}
        currentAnimation={mockCurrentAnimation}
        animationForEdit={mockAnimationForEdit}
        loadAnimation={mockLoadAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
      />
    )
  })

describe('AnimationMenu', () => {

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if redirect is true', () => {
    wrapper.state().redirect = true
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if there is an animation staged for edits', () => {
    mockAnimationForEdit =  {id: 1, user_id: 2, properties: [], keyframes: []}
    wrapper = shallow(<AnimationMenu 
    myAnimations={mockMyAnimations}
    prebuiltAnimations={mockPrebuiltAnimations}
    currentAnimation={mockCurrentAnimation}
    animationForEdit={mockAnimationForEdit}
    loadAnimation={mockLoadAnimation}
    saveOriginalAnimation={mockSaveOriginalAnimation}
    />)
    
    expect(wrapper).toMatchSnapshot()
  })

  it('should run loadAnimation when the go! button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'loadAnimation')
    wrapper.instance().checkSelected = jest.fn()
    wrapper.find('.close-select-ani-btn').simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  describe('loadAnimation', () => {

    beforeEach(() => {
      wrapper.instance().checkSelected = jest.fn().mockImplementation(() => true)
    })

    it('should return false if checkSelected returns false', () => {
      wrapper.instance().checkSelected = jest.fn().mockImplementation(() => false)
      const result = wrapper.instance().loadAnimation()
  
      expect(result).toBe(false)
    })

    it('should call loadAnimation with the selected animation if it is a custom animation', () => {
      const expected = {id: 2, user_id: 2, properties: [], keyframes: []}
      wrapper.instance().loadAnimation()

      expect(mockLoadAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call loadAnimation with the selected animation if it is a prebuilt animation', () => {
      document.querySelector = jest.fn().mockImplementation(() => ({
        classList: ['', 3]
      }))
      const expected = {id: 3, user_id: null, properties: [], keyframes: []}
      wrapper.instance().loadAnimation()

      expect(mockLoadAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call saveOriginal animation with a stringified version of the selected animation', () => {
      const expected = "{\"id\":2,\"user_id\":2,\"properties\":[],\"keyframes\":[]}"
      wrapper.instance().loadAnimation()

      expect(mockSaveOriginalAnimation).toHaveBeenCalledWith(expected)
    })

    it('should insert the keyframes into the stylesheet', () => {
      const expected = {id: 2, user_id: null, properties: [], keyframes: []}
      wrapper.instance().loadAnimation()

      expect(CSSInsertion.updateKeyframes).toHaveBeenCalledWith(expected.keyframes)
    })

    it('should set redirect in state to true', () => {
      wrapper.instance().loadAnimation()
      
      expect(wrapper.state().redirect).toBe(true)
    })

  })

  describe('checkSelected', () => {

    it('should display an incorrect message if there are no selected animations', () => {
      document.querySelector = jest.fn().mockImplementation((string) => {
        if(string === '.select-animation-message') {
          return {classList: {add: jest.fn()}}
        } else {
          return false
        }
      })
      const result = wrapper.instance().checkSelected()

      expect(result).toBe(false)

    })

    it('should return true if there is a selected animation', () => {
      document.querySelector = jest.fn().mockImplementation((string) => {
        if(string === '.selected-animation') {return true}
        return [{classList: {add: jest.fn()}}]
      })
      
      const result = wrapper.instance().checkSelected()

      expect(result).toBe(true)
    })

  })

  describe('mapStateToProps', () => {

    it('should return a props object with a user, currentAnimation, and myAnimations property', () => {
      const mockState = {myAnimations: [], prebuiltAnimations: [], currentAnimation: {}, animationForEdit: {}}
      const expected = {myAnimations: [], prebuiltAnimations: [], currentAnimation: {}, animationForEdit: {}}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with updateCurrentAnimation when loadAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = updateCurrentAnimation(mockCurrentAnimation)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.loadAnimation(mockCurrentAnimation)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with saveOriginalAnimation when saveOriginalAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = saveOriginalAnimation(mockCurrentAnimation)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.saveOriginalAnimation(mockCurrentAnimation)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})