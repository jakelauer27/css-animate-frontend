import { App, mapStateToProps, mapDispatchToProps } from './App'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { getPrebuiltAnimations } from '../../thunks/getPrebuiltAnimations'
import { getMyAnimations } from '../../thunks/getMyAnimations'
import { updateCurrentAnimation, saveOriginalAnimation } from '../../actions/actions'
import * as CSSInsertion from '../../utils/keyframesInsertion'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import rootReducer from '../../reducers/index'
import AnimationMenu from '../AnimationMenu/AnimationMenu'
import Editor from '../Editor/Editor'
import Error from '../../components/Error/Error'
import Header from '../Header/Header'
import HowToPopup from '../../components/HowToPopup/HowToPopup'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import Viewer from '../Viewer/Viewer'
import { createStore } from 'redux'

jest.mock('../../components/HowToPopup/HowToPopup')
jest.mock('../Viewer/Viewer')
jest.mock('../../components/Error/Error')
jest.mock('../Header/Header')
jest.mock('../Editor/Editor')
jest.mock('../Login/Login')
jest.mock('../SignUp/SignUp')
jest.mock('../AnimationMenu/AnimationMenu')
jest.mock('../../utils/keyframesInsertion')
jest.mock('../../thunks/getMyAnimations')
jest.mock('../../thunks/getPrebuiltAnimations')

describe('App', () => {
  let wrapper
  let mockGetPrebuiltAnimations
  let mockUpdateCurrentAnimation
  let mockSaveOriginalAnimation
  let mockGetMyAnimations
  let mockPrebuiltAnimations

  beforeEach(() => {
    mockGetPrebuiltAnimations = jest.fn()
    mockUpdateCurrentAnimation = jest.fn()
    mockSaveOriginalAnimation = jest.fn()
    mockGetMyAnimations = jest.fn()
    mockPrebuiltAnimations = [{name: 'mockAnimation', keyframes: {}}]
    wrapper = shallow( 
      <App 
        prebuiltAnimations={mockPrebuiltAnimations}
        user_id={1}
        getPrebuiltAnimations={mockGetPrebuiltAnimations}
        updateCurrentAnimation={mockUpdateCurrentAnimation}
        saveOriginalAnimation={mockSaveOriginalAnimation}
        getMyAnimations={mockGetMyAnimations}
      />
    )
  })


  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    
    it('should call getPrebuiltAnimations', async () => {
      await wrapper.instance().componentDidMount()

      expect(mockGetMyAnimations).toHaveBeenCalled()
    })

    it('should call thisInitialAnimation', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'loadInitialAnimation')
      await wrapper.instance().componentDidMount()

      expect(spy).toHaveBeenCalled()
    })

    it('should call getMyAnimations if a user is logged in', async () => {
      await wrapper.instance().componentDidMount()

      expect(mockGetMyAnimations).toHaveBeenCalled()
    })
  })

  describe('loadInitialAnimation', () => {

    it('should call updateCurrentAnimation with the correct params', () => {
      wrapper.instance().loadInitialAnimation()
      expect(mockUpdateCurrentAnimation).toHaveBeenCalledWith(mockPrebuiltAnimations[0])
    })

    it('should call saveOriginalAnimation with the correct params', () => {
      wrapper.instance().loadInitialAnimation()
      expect(mockSaveOriginalAnimation).toHaveBeenCalledWith(JSON.stringify(mockPrebuiltAnimations[0]))

    })

    it('should call CSSinsertion.updateKeyframes with the correct params', () => {
      wrapper.instance().loadInitialAnimation()
      expect(CSSInsertion.updateKeyframes).toHaveBeenCalledWith(mockPrebuiltAnimations[0].keyframes)
    })
  })
  
  describe('mapStateToProps', () => {

    it('shoudld return a props object with a user_id and prebuiltanimations property', () => {
      const mockState = {prebuiltAnimations: {keyframes: {name: 'slideInX'}}, user:{id: 1}}
      const expected = {prebuiltAnimations: {keyframes: {name: 'slideInX'}}, user_id: 1}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with a getPrebuiltAnimations action when getPrebuiltAnimations is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = getPrebuiltAnimations()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getPrebuiltAnimations()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a updateCurrentAnimation action when updateCurrentAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = updateCurrentAnimation()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.updateCurrentAnimation()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a saveOriginalAnimation action when saveOriginalAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = saveOriginalAnimation()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.saveOriginalAnimation()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a getMyAnimations action when getMyAnimations is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = getMyAnimations()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getMyAnimations()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  describe('routes', () => {

    // it('should redirect to properties if at the base route', () => {
    //   let wrapper = mount(
    //     <Provider store={createStore(() => ({name: 'mockAnimation', keyframes: {}}))}>
    //       <MemoryRouter initialEntries={['/']}>
    //         <App 
    //           prebuiltAnimations={mockPrebuiltAnimations}
    //           user_id={1}
    //           getPrebuiltAnimations={mockGetPrebuiltAnimations}
    //           updateCurrentAnimation={mockUpdateCurrentAnimation}
    //           saveOriginalAnimation={mockSaveOriginalAnimation}
    //           getMyAnimations={mockGetMyAnimations}
    //         />
    //       </MemoryRouter>
    //     </Provider>
    //     )
    //     expect(wrapper.find(Editor)).toHaveLength(1)
    //     expect(wrapper.find(Viewer)).toHaveLength(1)
    // })

    // it('should render Editor and Viewer with the correct animation', () => {
    //   let wrapper = mount(
    //     <Provider store={createStore(() => ({animation: mockAnimation}))}>
    //       <MemoryRouter initialEntries={['/slideInY/properties']}>
    //         <App />
    //       </MemoryRouter>
    //     </Provider>
    //     )
    //     expect(wrapper.find(Editor)).toHaveLength(1)
    //     expect(wrapper.find(Viewer)).toHaveLength(1)
    // })

    // it('should render the howToPopup if at the howto route', () => {
    //   let wrapper = mount(
    //     <Provider store={createStore(() => ({animation: mockAnimation}))}>
    //       <MemoryRouter initialEntries={['/slideInX/properties/howto']}>
    //         <App  />
    //       </MemoryRouter>
    //     </Provider>
    //     )
    //     expect(wrapper.find(HowToPopup)).toHaveLength(1)
    // })
  })
})