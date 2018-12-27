import PropertiesInfo from './PropertiesInfo'
import React from 'react'
import { shallow } from 'enzyme'

describe('GeneralInfo', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<PropertiesInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})