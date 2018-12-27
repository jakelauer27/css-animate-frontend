import KeyframesInfo from './KeyframesInfo'
import React from 'react'
import { shallow } from 'enzyme'

describe('GeneralInfo', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<KeyframesInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})