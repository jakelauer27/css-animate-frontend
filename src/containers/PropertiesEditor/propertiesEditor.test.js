import React from 'react'
import { PropertiesEditor, mapStateToProps, mapDispatchToProps } from './PropertiesEditor'
import { shallow } from 'enzyme'
import { loadAnimation } from '../../actions/actions'
import * as formValidation from '../../utils/formValidators'

jest.mock('../../utils/formValidators')


describe('PropertiesEditor', () => {
  let wrapper
  const mockUpdateAnimation = jest.fn()
  const mockAnimation = { 
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
    document.querySelector = jest.fn().mockImplementation(() => ({
      click: jest.fn()
    }))
    wrapper = shallow(<PropertiesEditor animation={mockAnimation} updateAnimation={mockUpdateAnimation} />)
  })
  
  it('should match the snapshot', () => {
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
      const expected = {"keyframes": {"name": "slideInX", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}]}]}, "properties": {"delay": "0s", "direction": "alternate", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}}
      wrapper.instance().saveForm(mockEvent)
      expect(mockUpdateAnimation).toHaveBeenCalledWith(expected)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with an animation property', () => {
      const mockState = {animation: mockAnimation}
      const expected = {animation: mockAnimation}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with a loadNewAnimation property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = loadAnimation(mockAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.updateAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})