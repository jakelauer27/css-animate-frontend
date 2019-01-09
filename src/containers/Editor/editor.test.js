import { Editor, mapStateToProps, mapDispatchToProps } from './Editor' 
import React from 'react'
import { shallow, mount } from 'enzyme'
import { loadAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import KeyframesEditor from '../KeyframesEditor/KeyframesEditor'
import PropertiesEditor from '../PropertiesEditor/PropertiesEditor'
import CopyPopup from '../CopyPopup/CopyPopup'


jest.mock('../../utils/keyframesInsertion')

CSSInsertion.updateKeyframes.mockImplementation(() => jest.fn())

describe('Editor', () => {
  let wrapper
  let mockOriginalAnimation
  let mockUpdateCurrentAnimation
  let mockSaveOriginalAnimation
  let mockEditAnimation
  const mockLoadAnimation = jest.fn()
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
    mockOriginalAnimation = '{}'
    mockEditAnimation = jest.fn()
    mockSaveOriginalAnimation = jest.fn()
    mockUpdateCurrentAnimation = jest.fn()
    wrapper = shallow(
      <Editor 
        user_id={1}
        originalAnimation={mockOriginalAnimation}
        currentAnimation={mockAnimation}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
        editAnimation={mockEditAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
      />
    )
  })

  it('should have a default state', () => {
    const expected = {saveText: 'save'}
    expect(wrapper.state()).toEqual(expected)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call resetAnimation when reset button is clicked', () => {
    const loadNewSpy = jest.spyOn(wrapper.instance(), 'resetAnimation')
    wrapper.find('.reset-btn').simulate('click')
    expect(loadNewSpy).toHaveBeenCalledWith(mockOriginalAnimation)
  })

  it('should call saveAnimation when save button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'saveAnimation')
    wrapper.find('.save-btn').simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  describe('resetInputValidation', () => {
    document.querySelectorAll = jest.fn().mockImplementation(() => {
      return [{classList: {remove: jest.fn()}}]
    })
    document.querySelector = jest.fn().mockImplementation(() => ({removeAttribute: jest.fn()}))
  
    it('should remove red class from all inputs', () => {
      wrapper.instance().resetInputValidation()
      expect(document.querySelectorAll).toHaveBeenCalled()
    })

    it('should remove disabled attr from play btn', () => {
      wrapper.instance().resetInputValidation()
      expect(document.querySelector).toHaveBeenCalled()
    })
  })

  describe('resetAnimation', () => {

  })

  describe('saveAnimation', () => {

  })

  describe('resetSaveText', () => {

  })

  describe('routes', () => {

    it('should render keyframes component if on keyframes route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/slideInX/keyframes']}>
            <Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(KeyframesEditor)).toHaveLength(1)
    })
    
    it('should render properties component if on properties route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/properties']}>
            <Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(PropertiesEditor)).toHaveLength(1)
    })

    it('should render copyCode component if on copyCode route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/properties/copy']}>
            <Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(CopyPopup)).toHaveLength(1)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with user, oganimation, and currentanimation properties', () => {
      const mockState = {currentAnimation: mockAnimation, originalAnimation: mockOriginalAnimation, user:{id: 1}}
      const expected = {currentAnimation: mockAnimation, originalAnimation: mockOriginalAnimation, user_id: 1}
      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should return a props object with an upDateAnimation property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = loadAnimation(mockAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.loadNewAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})