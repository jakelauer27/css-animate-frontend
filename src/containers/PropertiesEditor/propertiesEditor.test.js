import React from 'react'
import { PropertiesEditor, mapStateToProps, mapDispatchToProps } from './PropertiesEditor'
import { shallow } from 'enzyme'
import { updateCurrentAnimation } from '../../actions/actions'
import * as formValidation from '../../utils/formValidators/formValidators'
import * as buttonDisablers from '../../utils/buttondisablers'

jest.mock('../../utils/formValidators/formValidators')
jest.mock('../../utils/buttondisablers')

formValidation.validateAnimationProp.mockImplementation(() => true)

describe('PropertiesEditor', () => {
  let mockUpdateCurrentAnimation
  let wrapper
  const mockAnimation = { 
    ani_name: 'slideInX',
    id: 1,
    user_id: 1,
    'properties': {
      'name': 'slideInX',
      'duration': '1.5s',
      'timingFunction': 'ease',
      'delay': '0s',
      'iterationCount': '1',
      'direction': 'normal',
      'fillMode': 'forwards'
    },
    'keyframes': {
      'name': 'slideInX',
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
    mockUpdateCurrentAnimation = jest.fn()
    document.querySelector = jest.fn().mockImplementation(() => ({
      click: jest.fn()
    }))
    wrapper = shallow(<PropertiesEditor currentAnimation={mockAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation} />)
  })
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if there is no animation', () => {
    wrapper = shallow(<PropertiesEditor currentAnimation={{}} updateCurrentAnimation={mockUpdateCurrentAnimation} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should call saveForm when a property input is changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'saveForm')
    const mockEvent = {target: {value: 'alternate', classList: ['input', 'direction']}}
    
    wrapper.find('input.direction').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalledWith(mockEvent)
  })

  describe('saveForm', () => {
    const mockEvent = {target: {value: 'alternate', classList: ['input', 'direction']}}

    it('should click the stop btn', () => {
      wrapper.instance().saveForm(mockEvent)
      expect(document.querySelector).toHaveBeenCalledWith('.stop-btn')
    })

    it('should call a validator to validate the input', () => {
      const spy = jest.spyOn(formValidation, 'validateAnimationProp')
      wrapper.instance().saveForm(mockEvent)
      expect(spy).toHaveBeenCalledWith(mockEvent.target, mockEvent.target.value)
    })

    it('should call updateAnimation with the updated Animation', () => {
      const expected =  {"ani_name": "slideInX", "id": 1, "keyframes": {"name": "slideInX", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}]}]}, "properties": {"delay": "0s", "direction": "alternate", "duration":"1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}
      wrapper.instance().saveForm(mockEvent)
      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expected)
    })

    it('should disable buttons if it is a custom animation', () => {
      const spy = jest.spyOn(buttonDisablers, 'buttonDisabler')
      wrapper.instance().saveForm(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
    })

    it('should disable buttons if it is a prebuilt animation', () => {
      mockAnimation.user_id = null
      wrapper = shallow(<PropertiesEditor currentAnimation={mockAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation} />)

      const spy = jest.spyOn(buttonDisablers, 'prebuiltButtonDisabler')
      wrapper.instance().saveForm(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with an animation property', () => {
      const mockState = {currentAnimation: mockAnimation}
      const expected = {currentAnimation: mockAnimation}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with a loadNewAnimation property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = updateCurrentAnimation(mockAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.updateCurrentAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})