import { Saveas, mapStateToProps, mapDispatchToProps } from './Saveas'
import { shallow } from 'enzyme'
import React from 'react'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import * as API from '../../utils/apiCalls/apiCalls'

jest.mock('../../utils/apiCalls/apiCalls')
jest.mock('../../thunks/getMyAnimations')

API.addAnimation.mockImplementation(() => ({id: 1}))

describe('Saveas', () => {
  let mockClosePopup 
  let mockUpdateCurrentAnimation
  let mockSaveOriginalAnimation
  let mockGetMyAnimations
  let wrapper 
  const mockCurrentAnimation = {
    ani_name: 'slideInY',
    id: 1,
    user_id: 1,
    'properties': {
      'name': 'slideInY',
      'duration': '1.5s',
      'timingFunction': 'ease',
      'delay': '0s',
      'iterationCount': '1',
      'direction': 'normal',
      'fillMode': 'forwards'
    },
    'keyframes': {
      'name': 'slideInY',
      'sections': [
        {
          'name': '0%',
          'label': '0%',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(-300px)'
            }
          ]
        },
        {
          'name': '100%',
          'label': '100%',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(0px)'
            }
          ]
        },
      ]
    }
  }

  beforeEach(() => {
    mockClosePopup = jest.fn()
    mockUpdateCurrentAnimation = jest.fn()
    mockSaveOriginalAnimation = jest.fn()
    mockGetMyAnimations = jest.fn()
    wrapper = shallow(
      <Saveas 
        closePopup={mockClosePopup}
        user_id={1} 
        currentAnimation={mockCurrentAnimation}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
        getMyAnimations={mockGetMyAnimations}  
      />)
  })


  it('should match the snapshot if there is a user logged in', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if there is no user logged in', () => {
    wrapper = shallow(
      <Saveas 
        closePopup={mockClosePopup}
        user_id={null} 
        currentAnimation={mockCurrentAnimation}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
        getMyAnimations={mockGetMyAnimations}  
      />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should run cancel when the cancel button is click and a user is logged in', () => {
    const mockEvent = {preventDefault: jest.fn()}
    const spy = jest.spyOn(wrapper.instance(), 'cancel')
    wrapper.find('.cancel-form-btn').simulate('click', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  it('should run cancel when the cancel button is click and no user is logged in', () => {
    wrapper = shallow(
      <Saveas 
        closePopup={mockClosePopup}
        user_id={null} 
        currentAnimation={mockCurrentAnimation}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
        getMyAnimations={getMyAnimations}  
      />)
    
    const mockEvent = {preventDefault: jest.fn()}
    const spy = jest.spyOn(wrapper.instance(), 'cancel')
    wrapper.find('.cancel-form-btn').simulate('click', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  it('should run handleSubmit when the save form button is clicked', () => {
    const mockEvent = {preventDefault: jest.fn()}
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    wrapper.find('.save-form-btn').simulate('click', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  it('should run handleChange when input is changed', () => {
    const mockEvent = {preventDefault: jest.fn()}
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')
    wrapper.find('input').simulate('change', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  it('should have a default state', () => {
    const expected = {name: ''}
    expect(wrapper.state()).toEqual(expected)
  })

  describe('handleChange', () => {

    it('should update name in state', () => {
      const mockEvent = {target: {value: 'jake'}}
      const expected = { name: 'jake'}
      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    const mockEvent = {preventDefault: jest.fn()}

    it('should call API.addAnimation with the correct params', async () => {
      wrapper.instance().setState({name: 'test'})
      const expected = {...mockCurrentAnimation}
      expected.properties.name = 'test'
      expected.keyframes.name = 'test'
      expected.ani_name = 'test'

      await wrapper.instance().handleSubmit(mockEvent)

      expect(API.addAnimation).toHaveBeenCalledWith(1, 'test', JSON.stringify(expected.properties), JSON.stringify(expected.keyframes))
    })

    it('should call getMyAnimations with the correct params', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })

    it('should call saveOriginalAnimation with the correct params', async () => {
      wrapper.instance().setState({name: 'test'})
      const expected = {...mockCurrentAnimation}
      expected.properties.name = 'test'
      expected.keyframes.name = 'test'
      expected.ani_name = 'test'

      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockSaveOriginalAnimation).toHaveBeenCalledWith(JSON.stringify(expected))
    })

    it('should call updateCurrentAnimation with the correct params', async () => {
      wrapper.instance().setState({name: 'test'})
      const expected = {...mockCurrentAnimation}
      expected.properties.name = 'test'
      expected.keyframes.name = 'test'
      expected.ani_name = 'test'

      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call closePopup', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockClosePopup).toHaveBeenCalled()
    })
  })

  describe('cancel', () => {

    it('should called closePopup', () => {
      const mockEvent = {preventDefault: jest.fn()}
      wrapper.instance().cancel(mockEvent)

      expect(mockClosePopup).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    const mockState = {currentAnimation: {keyframes: {name: 'slideInX'}}, user: {id: 1}}
    const expected = {currentAnimation: {keyframes: {name: 'slideInX'}}, user_id: 1}
    const result = mapStateToProps(mockState)
    expect(result).toEqual(expected)
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with a updateCurrentAnimation property', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = updateCurrentAnimation(mockCurrentAnimation)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.updateCurrentAnimation(mockCurrentAnimation)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return a props object with a saveOriginalAnimation property', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = saveOriginalAnimation(mockCurrentAnimation)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.saveOriginalAnimation(mockCurrentAnimation)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return a props object with a getMyAnimations property', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = getMyAnimations(1)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getMyAnimations(1)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })


})