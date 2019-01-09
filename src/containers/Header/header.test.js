import { Header, mapStateToProps, mapDispatchToProps } from './Header'
import React from 'react'
import { shallow } from 'enzyme'
import { signOut } from '../../actions/actions'

describe('header', () => {
  let mockSignOut
  let wrapper

  beforeEach(() => {
    mockSignOut = jest.fn()
    wrapper = shallow(<Header signOut={mockSignOut} user={{name: null}} />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if a user is logged in', () => {
    wrapper = shallow(<Header signOut={mockSignOut} user={{name: 'jake'}} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should called signOut when the login/logout button is clicked', () => {
    wrapper.find('.login-btn').simulate('click')
    expect(mockSignOut).toHaveBeenCalled()
  })

  describe('mapStateToProps', () => {
        
    it('should return a props object with a user property', () => {
      const mockState = {user: {name: 'jake', id: 1}}
      const expected = {user: {name: 'jake', id: 1}}

      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with a signIn action when loginUser is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = signOut()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.signOut()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})