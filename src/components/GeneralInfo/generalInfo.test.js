import GeneralInfo from './GeneralInfo'
import React from 'react'
import { shallow } from 'enzyme'

describe('GeneralInfo', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<GeneralInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})