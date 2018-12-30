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
    wrapper = shallow(<Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if there is no animation', () => {
    wrapper = shallow(<Editor animation={{keyframes: null}} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call loadNewAnimation when reset button is clicked', () => {
    const loadNewSpy = jest.spyOn(wrapper.instance(), 'loadNewAnimation')
    wrapper.find('.reset-btn').simulate('click')
    expect(loadNewSpy).toHaveBeenCalled()
  })

  it('should call resetInputValidion when reset button is clicked', () => {
    const resestInputSpy = jest.spyOn(wrapper.instance(), 'resetInputValidation')
    wrapper.find('.reset-btn').simulate('click')
    expect(resestInputSpy).toHaveBeenCalled()
  })

  describe('componentDidMount', () => {

    it('should call loadNewAnimation', () => {
      wrapper = shallow(<Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>, {disableLifecycleMethods: true})
      const spy = jest.spyOn(wrapper.instance(), 'loadNewAnimation')
      wrapper.instance().componentDidMount()
      expect(spy).toHaveBeenCalledWith('slideInX')
    })
  })

  describe('loadNewAnimation', () => {
    wrapper = shallow(<Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>, {disableLifecycleMethods: true})

    it('should call loadNewAnimation from props', () => {
      const expected = {"keyframes": {"name": "slideInX", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}]}]}, "properties": {"delay": "0s", "direction": "normal", "duration": "1.5s", "fillMode": "forwards", "iterationCount": "1", "name": "slideInX", "timingFunction": "ease"}}
      wrapper.instance().loadNewAnimation('slideInX')
      expect(mockLoadAnimation).toHaveBeenCalledWith(expected);
    })

    it('should call updateKeyframes', () => {
      const expected = {"name": "slideInX", "sections": [{"label": "0%", "name": "0%", "properties": [{"name": "transform", "value": "translateX(-300px)"}]}, {"label": "100%", "name": "100%", "properties": [{"name": "transform", "value": "translateX(0px)"}]}]}
      wrapper.instance().loadNewAnimation('slideInX')
      expect(CSSInsertion.updateKeyframes).toHaveBeenCalledWith(expected);
    })
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
          <MemoryRouter initialEntries={['/slideInX/properties']}>
            <Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(PropertiesEditor)).toHaveLength(1)
    })

    it('should render copyCode component if on copyCode route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/slideInX/properties/copy']}>
            <Editor animation={mockAnimation} loadNewAnimation={mockLoadAnimation} currentAnimation={'slideInX'}/>
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(CopyPopup)).toHaveLength(1)
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
        mappedProps.loadNewAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})