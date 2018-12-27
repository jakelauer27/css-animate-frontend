import { App, mapStateToProps } from './App'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Editor from '../Editor/Editor'
import Viewer  from '../Viewer/Viewer'
import HowToPopup from '../../components/HowToPopup/HowToPopup'
import { createStore } from 'redux'

jest.mock('../../components/HowToPopup/HowToPopup')
jest.mock('../Viewer/Viewer')
jest.mock('../Editor/Editor')

describe('App', () => {

  it('should match the snapshot', () => {
    let wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
  
  describe('mapStateToProps', () => {
    const mockState = {animation: {keyframes: {name: 'slideInX'}}}
    const expected = {animation: 'slideInX'}
    const result = mapStateToProps(mockState)
    expect(result).toEqual(expected)
  })

  describe('routes', () => {
    let mockAnimationName = 'slideInX'
    let mockAnimation = {slideInX: {
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
  }

    it('should redirect to /slideInX/properties if at the base route', () => {
      let wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/']}>
            <App animation={mockAnimationName} />
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(Editor)).toHaveLength(1)
        expect(wrapper.find(Viewer)).toHaveLength(1)
    })

    it('should render Editor and Viewer with the correct animation', () => {
      let wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/slideInY/properties']}>
            <App animation={mockAnimationName} />
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(Editor)).toHaveLength(1)
        expect(wrapper.find(Viewer)).toHaveLength(1)
    })

    it('should render the howToPopup if at the howto route', () => {
      let wrapper = mount(
        <Provider store={createStore(() => ({animation: mockAnimation}))}>
          <MemoryRouter initialEntries={['/slideInX/properties/howto']}>
            <App animation={mockAnimationName} />
          </MemoryRouter>
        </Provider>
        )
        expect(wrapper.find(HowToPopup)).toHaveLength(1)
    })
  })
})