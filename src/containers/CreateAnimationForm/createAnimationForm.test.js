import React from 'react'
import { shallow } from 'enzyme'
import { CreateAnimationForm, mapStateToProps, mapDispatchToProps } from './CreateAnimationForm'
import * as API from '../../utils/apiCalls/apiCalls'
import * as formValidation from '../../utils/formValidators/formValidators'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { removeAnimationForEdit, updateCurrentAnimation } from '../../actions/actions'

jest.mock('../../utils/apiCalls/apiCalls')
jest.mock('../../utils/formValidators/formValidators')
jest.mock('../../thunks/getMyAnimations')

describe('CreateAnimationForm', () => {
  let wrapper
  let mockGetMyAnimations
  let mockCancelEdit
  let mockUpdateCurrentAnimation
  let mockAnimationToEdit
  let mockAnimationToEditEmpty

  beforeEach(() => {
    mockCancelEdit = jest.fn()
    mockGetMyAnimations = jest.fn()
    mockUpdateCurrentAnimation = jest.fn()
    mockAnimationToEditEmpty = {}
    mockAnimationToEdit = { id: 1, user_id: 2, ani_name: 'slideInX', id: 1,'properties': {
      'name': 'slideInX','duration': '1.5s','timingFunction': 'ease','delay': '0s','iterationCount': '1','direction': 'normal','fillMode': 'forwards'},
      'keyframes': {'name': 'slideInX','sections': [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]}}
    wrapper = shallow(
      <CreateAnimationForm 
        user_id={1}
        animationToEdit={mockAnimationToEdit}
        getMyAnimations={mockGetMyAnimations}
        cancelEdit={mockCancelEdit}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when redirect is true', () => {
    wrapper.state().redirect = true
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when create instead of edit mode', () => {
    wrapper = shallow(
      <CreateAnimationForm 
        user_id={1}
        animationToEdit={mockAnimationToEditEmpty}
        getMyAnimations={mockGetMyAnimations}
        cancelEdit={mockCancelEdit}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const expected = {
      properties: { name: '',
      duration: '',
      timingFunction: '',
      delay: '',
      iterationCount: '',
      direction: '',
      fillMode: ''
      },
      keyframes: [
        { label: '0%',
          name: '0%',
          properties: [
            { name: '', value: '' }
          ]
        },
        { label: '100%', name: '100%', properties: [{name: '', value: ''}]}],
      redirect: false,
      disabled: true
    }

    wrapper = shallow(
      <CreateAnimationForm 
        user_id={1}
        animationToEdit={mockAnimationToEditEmpty}
        getMyAnimations={mockGetMyAnimations}
        cancelEdit={mockCancelEdit}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
      />
    )

    expect(wrapper.state()).toEqual(expected)
  })

  describe('componentDidMount', () => {
    it('should set state properties and keyframes to animationToEdit if there is an animation to edit', () => {
      wrapper = shallow(
        <CreateAnimationForm 
          user_id={1}
          animationToEdit={mockAnimationToEdit}
          getMyAnimations={mockGetMyAnimations}
          cancelEdit={mockCancelEdit}
          updateCurrentAnimation={mockUpdateCurrentAnimation}
        />
      )
      expect(wrapper.state().properties).toEqual(mockAnimationToEdit.properties)
      expect(wrapper.state().keyframes).toEqual(mockAnimationToEdit.keyframes.sections)
    })
  })

  it('should call handleSubmit when save button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    wrapper.find('.save-form-btn').simulate('click')

    expect(spy).toHaveBeenCalled()
  })

  describe('handleSubmit', () => {
    document.querySelector = jest.fn().mockImplementation(() => {
      return {classList: {remove: jest.fn()}}
    })

    it('should remove selected-animation class from currently selected animation', async () => {
      await wrapper.instance().handleSubmit()

      expect(document.querySelector).toHaveBeenCalledWith('.selected-animation')
    })

    it('should not remove selected-animation if there is no currently selected animation', async () => {
      document.querySelector = jest.fn().mockImplementation(() => {
        return false
      })
      await wrapper.instance().handleSubmit()

      expect(document.querySelector).toHaveBeenCalledWith('.selected-animation')
    })

    it('should call submitEditedAnimation if in edit mode', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'submitEditedAnimation')
      await wrapper.instance().handleSubmit()
      const expected = {"name": "slideInX", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}]}]}

      expect(spy).toHaveBeenCalledWith(expected)
    })

    it('should call submitNewAnimation if in create mode', async () => {
      wrapper = shallow(
        <CreateAnimationForm 
          user_id={1}
          animationToEdit={mockAnimationToEditEmpty}
          getMyAnimations={mockGetMyAnimations}
          cancelEdit={mockCancelEdit}
          updateCurrentAnimation={mockUpdateCurrentAnimation}
        />
      )
      
      const spy = jest.spyOn(wrapper.instance(), 'submitNewAnimation')
      await wrapper.instance().handleSubmit()
      const expected = {"name": "", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "", "value": ""}]}, {"label": "100%", "name": "100%", "properties": [{"name": "", "value": ""}]}]}

      expect(spy).toHaveBeenCalledWith(expected)
    })
  })

  describe('submitEditedAnimation', () => {
    const mockSavedKeyframes = {name: 'keyframes'}


    it('should call editAnimation with the correct params', async () => {
      await wrapper.instance().submitEditedAnimation(mockSavedKeyframes)
      const expected = {"id": 1, "keyframes": {"name": "keyframes"}, "name": "slideInX", "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}

      expect(API.editAnimation).toHaveBeenCalledWith(1, 1, expected)
    })

    it('should call updateCurrentAnimation with the correct params', async () => {
      await wrapper.instance().submitEditedAnimation(mockSavedKeyframes)
      const expected = {"ani_name": "slideInX", "id": 1, "keyframes": {"name": "keyframes"}, "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}, "user_id": 1}

      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call cancelEdit', async () => {
      await wrapper.instance().submitEditedAnimation(mockSavedKeyframes)

      expect(mockCancelEdit).toHaveBeenCalled()
    })

    it('should call getMyAnimations with the a user_id', async () => {
      await wrapper.instance().submitEditedAnimation(mockSavedKeyframes)

      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })
  })

  describe('submitNewAnimation', () => {
    const mockSavedKeyframes = {name: 'keyframes'}
    API.addAnimation.mockImplementation(() => ({id: 42}))

    it('should call API.addAnimation with the correct params', async () => {
      await wrapper.instance().submitNewAnimation(mockSavedKeyframes)
      const expectedkeyframes = "{\"name\":\"keyframes\"}"
      const expectedProperties = "{\"name\":\"slideInX\",\"duration\":\"1.5s\",\"timingFunction\":\"ease\",\"delay\":\"0s\",\"iterationCount\":\"1\",\"direction\":\"normal\",\"fillMode\":\"forwards\"}"

      expect(API.addAnimation).toHaveBeenCalledWith(1, 'slideInX', expectedProperties, expectedkeyframes)
    })

    it('should call updateCurrentAnimation with the correct params', async () => {
      await wrapper.instance().submitNewAnimation(mockSavedKeyframes)
      const expected = {id: 42, user_id: 1, ani_name: 'slideInX', "keyframes": {"name": "keyframes"}, "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}}

      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call getMyAnimations with the a user_id', async () => {
      await wrapper.instance().submitNewAnimation(mockSavedKeyframes)

      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })

    it('should set redirect in state to true', async () => {
      await wrapper.instance().submitNewAnimation(mockSavedKeyframes)

      expect(wrapper.state().redirect).toBe(true)
    })
  })

  describe('handlePropertyChange', () => {
    const mockEvent = {target: {name: 'duration', value: '3s'}}

    it('should update state with new properties that have the correct changed property', () => {
      let expectedProperties = {'name': 'slideInX','duration': '1.5s','timingFunction': 'ease','delay': '0s','iterationCount': '1','direction': 'normal','fillMode': 'forwards'}
      expectedProperties.duration = '3s'
      wrapper.instance().handlePropertyChange(mockEvent)
      
      expect(wrapper.state().properties).toEqual(expectedProperties)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handlePropertyChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })

    it('should set disabled in state if form is complete but the input was invalid', () => {

      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => false)
      formValidation.keyframeValue = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handlePropertyChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('handleStageChange', () => {
    const mockEvent = {target: {name: 0, value: '34%'}}

    it('should update state with new keyframes that have the correct changed stage name and label', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]
      expectedSections[0].name = '34%'
      expectedSections[0].label = '34%'
      const expected = expectedSections
      wrapper.instance().handleStageChange(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handleStageChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })

    it('should set disabled in state if form is complete but the input was invalid', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => false)
      formValidation.keyframeValue = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handleStageChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('handlePropLabelChange', () => {
    const mockEvent = {target: {name: [1, 0, 0], value: 'newLabel'}}
    
    it('should update state with new keyframes that have the correct changed proplabel', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]
      expectedSections[1].properties[0].name = 'newLabel'
      const expected = expectedSections
      wrapper.instance().handlePropLabelChange(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handlePropLabelChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })

    it('should set disabled in state if form is complete but the input was invalid', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => false)
      formValidation.keyframeValue.mockImplementation(() => false)
      const expected = true
      wrapper.instance().handlePropLabelChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('handlePropValueChange', () => {
    const mockEvent = {target: {name: [1, 0, 0], value: 'test'}}

    it('should update state with new keyframes that have the correct changed propvalue', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]
      expectedSections[1].properties[0].value = 'test'
      const expected = expectedSections
      wrapper.instance().handlePropValueChange(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().handlePropValueChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })

    it('should set disabled in state if form is complete but the input was invalid', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => false)
      formValidation.keyframeValue.mockImplementation(() => false)
      const expected = true
      wrapper.instance().handlePropValueChange(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('addProperty', () => {
    const mockEvent = {target: {classList: ['1']}}

    it('should update state with new keyframes plus the added property', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]
      expectedSections[1].properties.push({name: '', value: ''})
      const expected = expectedSections
      wrapper.instance().addProperty(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().addProperty(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('removeProperty', () => {
    const mockEvent = {target: {classList: ['1', '0']}}

    it('should update state with new keyframes minus the removed property', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]
      expectedSections[1].properties = []
      const expected = expectedSections
      wrapper.instance().removeProperty(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().removeProperty(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('addStage', () => {
    const mockEvent = {target: {classList: ['0']}}

    it('should update state with new keyframes with the inserted added stage', () => {
      let expectedSections = [{'name': '0%','label': '0%','properties': [{'name': 'transform','value': 'translateX(-300px)'}]},{'name': '100%','label': '100%','properties': [{'name': 'transform','value': 'translateX(0px)'}]},]     
      const newSection = {label: '%', name: '%', properties: [{name: '', value: ''}]}
      expectedSections.splice(1, 0, newSection)
      const expected = expectedSections
      wrapper.instance().addStage(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().addStage(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('removeStage', () => {
    const mockEvent = {target: {classList: ['0']}}

    it('should update state with new keyframes minus the removed stage', () => {
      const expected = [mockAnimationToEdit.keyframes.sections[1]]
      wrapper.instance().removeStage(mockEvent)

      expect(wrapper.state().keyframes).toEqual(expected)
    })

    it('should set disabled in state if form is incomplete', () => {
      wrapper.instance().checkFormCompletion = jest.fn().mockImplementation(() => true)
      const expected = true
      wrapper.instance().removeStage(mockEvent)

      expect(wrapper.state().disabled).toEqual(expected)
    })
  })

  describe('cancelEdit', () => {

    it('should call getMyAnimations passing in the user id', async () => {
      await wrapper.instance().cancelEdit()
      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })

    it('should call cancelEdit', async () => {
      await wrapper.instance().cancelEdit()
      expect(mockCancelEdit).toHaveBeenCalled()
    })
  })

  describe('checkFormCompletion', () => {

    it('should return false if any property value is blank', () => {
      mockAnimationToEdit.properties.duration = ''
      wrapper = shallow(<CreateAnimationForm user_id={1} animationToEdit={mockAnimationToEdit} getMyAnimations={mockGetMyAnimations} cancelEdit={mockCancelEdit} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
      const result = wrapper.instance().checkFormCompletion()

      expect(result).toBe(true)
    })

    it('should return false if any stage value is blank', () => {
      mockAnimationToEdit.keyframes.sections[0].name = ''
      wrapper = shallow(<CreateAnimationForm user_id={1} animationToEdit={mockAnimationToEdit} getMyAnimations={mockGetMyAnimations} cancelEdit={mockCancelEdit} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
      const result = wrapper.instance().checkFormCompletion()

      expect(result).toBe(true)
    })

    it('should return false if any keyframes property name is blank', () => {
      mockAnimationToEdit.keyframes.sections[0].properties[0].name = ''
      wrapper = shallow(<CreateAnimationForm user_id={1} animationToEdit={mockAnimationToEdit} getMyAnimations={mockGetMyAnimations} cancelEdit={mockCancelEdit} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
      const result = wrapper.instance().checkFormCompletion()

      expect(result).toBe(true)
    })

    it('should return false if any keyframes value is blank', () => {
      mockAnimationToEdit.keyframes.sections[0].properties[0].value = ''
      wrapper = shallow(<CreateAnimationForm user_id={1} animationToEdit={mockAnimationToEdit} getMyAnimations={mockGetMyAnimations} cancelEdit={mockCancelEdit} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
      const result = wrapper.instance().checkFormCompletion()

      expect(result).toBe(true)
    })

    it('should return true if form is complete', () => {
      wrapper = shallow(<CreateAnimationForm user_id={1} animationToEdit={mockAnimationToEdit} getMyAnimations={mockGetMyAnimations} cancelEdit={mockCancelEdit} updateCurrentAnimation={mockUpdateCurrentAnimation}/>)
      const result = wrapper.instance().checkFormCompletion()

      expect(result).toBe(false)
    })
  })

  describe('mapStateToProps', () => {
    
    it('should return a props obect with a user_id and animationToEdit property', () => {
      const mockState = {animationForEdit: mockAnimationToEdit, user:{id: 1}}
      const expected = {animationToEdit: mockAnimationToEdit, user_id: 1}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with a getMyAnimations action when getMyAnimations is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = getMyAnimations()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getMyAnimations()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a updateCurrentAnimation action when updateCurrentAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = updateCurrentAnimation()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.updateCurrentAnimation()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a removeAnimationForEdit action when cancelEdit is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = removeAnimationForEdit()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.cancelEdit()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})