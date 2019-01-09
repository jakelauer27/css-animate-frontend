import PropertiesInfo from '../PropertiesInfo/PropertiesInfo'
import GeneralInfo from '../GeneralInfo/GeneralInfo'
import KeyframesInfo from '../KeyframesInfo/KeyframesInfo'
import React from 'react'
import { shallow, mount } from 'enzyme'
import HowToPopup from './HowToPopup'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'


describe('HowToPopup', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<HowToPopup />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('routes', () => {
    const mockStore = {getState: jest.fn(), subscribe: jest.fn(), dispatch: jest.fn()}

    it('should render GeneralInfo if on the GeneralInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/properties/howto/general']}>
            <HowToPopup></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(GeneralInfo)).toHaveLength(1)
    })

    it('should render PropertiesInfo if on the PropertiesInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/properties/howto/properties']}>
            <HowToPopup></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(PropertiesInfo)).toHaveLength(1)
    })

    it('should render keyframesInfo if on the keyframesInfo route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/properties/howto/keyframes']}>
            <HowToPopup></HowToPopup>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(KeyframesInfo)).toHaveLength(1)
    })
  })
})