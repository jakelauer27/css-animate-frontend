import PropertiesInfo from '../PropertiesInfo/PropertiesInfo'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import KeyframesInfo from '../KeyframesInfo/KeyframesInfo'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { mapStateToProps, HowToPopup } from './HowToPopup'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


describe('HowToPopup', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<HowToPopup />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    
    it('should return the current animation name as string', () => {
      const mockState = {animation: {keyframes: {name: 'slideInX'}}}
      const expected = {animation: 'slideInX'}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('routes', () => {
    const mockAnimation = 'slideInX'
    const mockStore = {getState: jest.fn(), subscribe: jest.fn(), dispatch: jest.fn()}

    it('should render GeneralInfo if on the GeneralInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/slideInX/properties/howto/general']}>
            <HowToPopup animation={mockAnimation}></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(GeneralInfo)).toHaveLength(1)
    })

    it('should render PropertiesInfo if on the PropertiesInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/slideInX/properties/howto/properties']}>
            <HowToPopup animation={mockAnimation}></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(PropertiesInfo)).toHaveLength(1)
    })

    it('should render keyframesInfo if on the keyframesInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/slideInX/properties/howto/keyframes']}>
            <HowToPopup animation={mockAnimation}></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(KeyframesInfo)).toHaveLength(1)
    })
  })
})