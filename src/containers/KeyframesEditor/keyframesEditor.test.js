import { KeyframesEditor, mapStateToProps, mapDispatchToProps } from './KeyframesEditor'
import React from 'react'
import { shallow } from 'enzyme'
import { updateCurrentAnimation } from '../../actions/actions'
import { updateKeyframes } from '../../utils/keyframesInsertion'
import * as formValidation from '../../utils/formValidators/formValidators'
import * as buttonDisablers from '../../utils/buttondisablers'

jest.mock('../../utils/buttondisablers')
jest.mock('../../utils/formValidators/formValidators')
jest.mock('../../utils/keyframesInsertion')

formValidation.keyframeStage.mockImplementation(() => true)
formValidation.keyframeValue.mockImplementation(() => true)

describe('keyframesEditor', () => {
  let wrapper
  let mockUpdateCurrentAnimation 
  const mockCurrentAnimation = { 
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
            },
            {
              'name': 'color',
              'value': 'blue'
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
            },
            {
              'name': 'color',
              'value': 'blue'
            }
          ]
        },
      ]
    }
  }
  const mockAltAnimation = { 
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
            },
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
    wrapper = shallow(<KeyframesEditor currentAnimation={mockCurrentAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if there is no animation', () => {
    wrapper = shallow(<KeyframesEditor currentAnimation={{keyframes: null}} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call saveKeyframesStages when a label input is changed', () => {
    wrapper = shallow(<KeyframesEditor currentAnimation={mockAltAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
    const spy = jest.spyOn(wrapper.instance(), 'saveKeyframesStages')
    const mockEvent = {target: {value: '3%', classList: ['input', '0%']}}
    
    wrapper.find('.keyframes-label').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalledWith(mockEvent)
  })

  it('should call saveKeyframesProps when a value input is changed', () => {
    wrapper = shallow(<KeyframesEditor currentAnimation={mockAltAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
    const spy = jest.spyOn(wrapper.instance(), 'saveKeyframesProps')
    const mockEvent = {target: {value: 'rotateY(30deg)', classList: ['input', 'transform'], parentElement: {parentElement: {childNodes: [{classList: [null, '0%']}]}}}}
    
    wrapper.find('.keyframe-prop-value').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalledWith(mockEvent)
  })

  describe('saveKeyframesStages', () => {
      let mockEvent;

    beforeEach(() => {
      mockEvent = {target: {value: '3%', classList: ['input', '0%']}}
    })
    
    it('should call formvalidation to validate the input', () => {
      const spy = jest.spyOn(formValidation, 'keyframeStage')
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(spy).toHaveBeenCalledWith(mockEvent.target, mockEvent.target.value)
    })

    it('should click the stop btn on the dom', () => {
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(document.querySelector).toHaveBeenCalledWith('.stop-btn')
    })

    it('should call updateAnimation passing in an updated animation with a % if the value is empty', () => {
      mockEvent = {target: {value: '', classList: ['input', '0%']}}
      const expectedAnimation = {"ani_name": "slideInX", "id": 1, "keyframes": {"name": "slideInX", "sections": [{"label": "%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}, {"name": "color", "value": "blue"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}, {"name": "color", "value": "blue"}]}]}, "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expectedAnimation)
    })

    it('should call updateAnimation passing in an updated animation with the input value', () => {
      const expectedAnimation = {"ani_name": "slideInX", "id": 1, "keyframes": {"name": "slideInX", "sections": [{"label": "3%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}, {"name": "color", "value": "blue"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}, {"name": "color", "value": "blue"}]}]}, "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expectedAnimation)
    })

    it('should call updateKeyframes passing in an updated keyframes with the input value', () => {
      updateKeyframes.mockImplementation(() => jest.fn())
      const expectedAnimation = {"name": "slideInX", "sections": [{"label": "3%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}, {"name": "color", "value": "blue"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}, {"name": "color", "value": "blue"}]}]}
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(updateKeyframes).toHaveBeenCalledWith(expectedAnimation)
    })


    it('should disable buttons if it is a custom animation', () => {
      const spy = jest.spyOn(buttonDisablers, 'buttonDisabler')
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
    })

    it('should disable buttons if it is a prebuilt animation', () => {
      mockCurrentAnimation.user_id = null
      wrapper = shallow(<KeyframesEditor currentAnimation={mockCurrentAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation} />)

      const spy = jest.spyOn(buttonDisablers, 'prebuiltButtonDisabler')
      wrapper.instance().saveKeyframesStages(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
      mockCurrentAnimation.user_id = 1
    })
  })

  describe('saveKeyframesProps', () => {
    let mockEvent;

    beforeEach(() => {
      mockEvent = {target: {value: 'rotateY(30deg)', classList: ['input', 'transform'], parentElement: {parentElement: {childNodes: [{classList: [null, '0%']}]}}}}
      document.querySelector = jest.fn().mockImplementation(() => ({
        click: jest.fn()
      }))
    })
    
    it('should call formvalidation to validate the input', () => {
      const spy = jest.spyOn(formValidation, 'keyframeValue')
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(spy).toHaveBeenCalledWith(mockEvent.target, mockEvent.target.value)
    })

    it('should click the stop btn on the dom', () => {
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(document.querySelector).toHaveBeenCalledWith('.stop-btn')
    })

    it('should call updateAnimation passing in an updated animation with the input value', () => {
      const expectedAnimation =  {"ani_name": "slideInX", "id": 1, "keyframes": {"name": "slideInX", "sections": [{"label": "3%", "name": "0%", "properties": [{"name": "transform", "value": "rotateY(30deg)"}, {"name": "color", "value": "blue"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}, {"name": "color", "value": "blue"}]}]},"properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expectedAnimation)
    })

    it('should call updateKeyframes passing in an updated keyframes with the input value', () => {
      updateKeyframes.mockImplementation(() => jest.fn())
      const expectedAnimation = {"name": "slideInX", "sections": [{"label": "3%", "name": "0%", "properties": [{"name": "transform", "value": "rotateY(30deg)"}, {"name": "color", "value": "blue"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}, {"name": "color", "value": "blue"}]}]}
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(updateKeyframes).toHaveBeenCalledWith(expectedAnimation)
    })

    it('should disable buttons if it is a custom animation', () => {
      const spy = jest.spyOn(buttonDisablers, 'buttonDisabler')
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
    })

    it('should disable buttons if it is a prebuilt animation', () => {
      mockCurrentAnimation.user_id = null
      wrapper = shallow(<KeyframesEditor currentAnimation={mockCurrentAnimation} updateCurrentAnimation={mockUpdateCurrentAnimation} />)

      const spy = jest.spyOn(buttonDisablers, 'prebuiltButtonDisabler')
      wrapper.instance().saveKeyframesProps(mockEvent)
      expect(spy).toHaveBeenCalledWith(true)
      mockCurrentAnimation.user_id = 1
    })

  })

  describe('mapStateToProps', () => {

    it('should return a props object with an animation property', () => {
      const mockState = {currentAnimation: mockCurrentAnimation}
      const expected = {currentAnimation: mockCurrentAnimation}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with a loadNewAnimation property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = updateCurrentAnimation(mockCurrentAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.updateCurrentAnimation(mockCurrentAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
