import { Editor, mapStateToProps, mapDispatchToProps } from './Editor' 
import React from 'react'
import { shallow, mount } from 'enzyme'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import KeyframesEditor from '../KeyframesEditor/KeyframesEditor'
import PropertiesEditor from '../PropertiesEditor/PropertiesEditor'
import CopyPopup from '../CopyPopup/CopyPopup'
import { editAnimation } from '../../utils/apiCalls/apiCalls'


jest.mock('../../utils/apiCalls/apiCalls')
jest.mock('../../utils/keyframesInsertion')
jest.mock('../PropertiesEditor/PropertiesEditor')
jest.mock('../KeyframesEditor/KeyframesEditor')
jest.mock('../CopyPopup/CopyPopup')

CSSInsertion.updateKeyframes.mockImplementation(() => jest.fn())

describe('Editor', () => {
  let wrapper
  let mockOriginalAnimation
  let mockUpdateCurrentAnimation
  let mockSaveOriginalAnimation
  let mockEditAnimation
  const mockAnimation = { 
    id: 1,
    user_id: 2,
    ani_name: 'slideInX',
    id: 1,
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
    mockOriginalAnimation = '{"keyframes": "test"}'
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
    const expected = {"saveText": "save", "saveas": false}
    expect(wrapper.state()).toEqual(expected)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when rendering saveAs', () => {
    wrapper.state().saveAs = true
    expect(wrapper).toMatchSnapshot()
  })

  it('should call resetAnimation when reset button is clicked', () => {
    const loadNewSpy = jest.spyOn(wrapper.instance(), 'resetAnimation')
    wrapper.find('.reset-btn').simulate('click')
    expect(loadNewSpy).toHaveBeenCalled()
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

    it('should call updateCurrentAnimation with a parsed original animation', () => {
      const expected = {"keyframes": "test"}
      wrapper.instance().resetAnimation()

      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call updateKeyframes with a parsed original animation.keyframes', () => {
      const expected = 'test'
      wrapper.instance().resetAnimation()

      expect(CSSInsertion.updateKeyframes).toHaveBeenCalledWith(expected)
    })

    it('should call resetInputValidation', () => {
      const spy = jest.spyOn(wrapper.instance(), 'resetInputValidation')
      wrapper.instance().resetAnimation()

      expect(spy).toHaveBeenCalled()
    })
  })
  
  describe('saveAnimation', () => {

    it('should set savetext in state to "saved!"', () => {
      wrapper.instance().saveAnimation()

      expect(wrapper.state().saveText).toEqual('saved!')
    })

    it('should call saveOriginalAnimation with the correct params', () => {
      const expected = "{\"id\":1,\"user_id\":2,\"ani_name\":\"slideInX\",\"properties\":{\"name\":\"slideInX\",\"duration\":\"1.5s\",\"timingFunction\":\"ease\",\"delay\":\"0s\",\"iterationCount\":\"1\",\"direction\":\"normal\",\"fillMode\":\"forwards\"},\"keyframes\":{\"name\":\"slideInX\",\"sections\":[{\"name\":\"0%\",\"label\":\"0%\",\"properties\":[{\"name\":\"transform\",\"value\":\"translateX(-300px)\"}]},{\"name\":\"100%\",\"label\":\"100%\",\"properties\":[{\"name\":\"transform\",\"value\":\"translateX(0px)\"}]}]}}"
      wrapper.instance().saveAnimation()

      expect(mockSaveOriginalAnimation).toHaveBeenCalledWith(expected)
    })

    it('should call editAnimation with the correct params', async () => {
      await wrapper.instance().saveAnimation()

      expect(editAnimation).toHaveBeenCalledWith(1, 1, mockAnimation)
    })

    it('should call resetSaveText after waiting 2 seconds', async () => {
      jest.useFakeTimers();
      await wrapper.instance().saveAnimation()
      
      expect(setTimeout).toHaveBeenCalled()
      expect(setTimeout).toHaveBeenCalledWith(wrapper.instance().resetSaveText, 2000)
    })
  })

  describe('resetSaveText', () => {

    it('should toggle saveText in state', () => {
      wrapper.state().saveText = 'saved!'
      const expected = 'save'
      wrapper.instance().resetSaveText()

      expect(wrapper.state().saveText).toEqual(expected)
    })
  })

  describe('toggleSaveas', () => {

    it('should toggle saveas in state', () => {
      const expected = true
      wrapper.instance().toggleSaveas()

      expect(wrapper.state().saveas).toEqual(expected)
    })
  })

  describe('routes', () => {

    it('should render keyframes component if on keyframes route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/keyframes']}>
            <Editor 
              user_id={1}
              originalAnimation={mockOriginalAnimation}
              currentAnimation={mockAnimation}
              updateCurrentAnimation={mockUpdateCurrentAnimation}
              editAnimation={mockEditAnimation}
              saveOriginalAnimation={mockSaveOriginalAnimation}
            />
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(KeyframesEditor)).toHaveLength(1)
    })
    
    it('should render properties component if on properties route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/properties']}>
            <Editor 
                user_id={1}
                originalAnimation={mockOriginalAnimation}
                currentAnimation={mockAnimation}
                updateCurrentAnimation={mockUpdateCurrentAnimation}
                editAnimation={mockEditAnimation}
                saveOriginalAnimation={mockSaveOriginalAnimation}
              />
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(PropertiesEditor)).toHaveLength(1)
    })

    it('should render copyCode component if on copyCode route', () => {
      wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/properties/copy']}>
            <Editor 
                user_id={1}
                originalAnimation={mockOriginalAnimation}
                currentAnimation={mockAnimation}
                updateCurrentAnimation={mockUpdateCurrentAnimation}
                editAnimation={mockEditAnimation}
                saveOriginalAnimation={mockSaveOriginalAnimation}
            />
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

    it('should return a props object with an updateCurrentAnimation property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = updateCurrentAnimation(mockAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.updateCurrentAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return a props object with an saveOriginal property', () => {
        const mockDispatch = jest.fn()
        const actionToDispatch = saveOriginalAnimation(mockAnimation)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.saveOriginalAnimation(mockAnimation)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})