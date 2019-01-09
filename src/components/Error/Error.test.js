import Error from './Error'
import { shallow } from 'enzyme'
import React from 'react'

describe('Error', () => {

  it('should match the snapshot', () => {
    let wrapper = shallow(<Error/>)
    expect(wrapper).toMatchSnapshot()
  })
})