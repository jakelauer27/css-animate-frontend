import { Login, mapDispatchToProps, mapStateToProps } from './Login'
import React from 'react'
import { shallow } from 'enzyme'
import { loginUser } from '../../thunks/login'
import { getMyAnimations } from '../../thunks/getMyAnimations'

jest.mock('../../thunks/login')
jest.mock('../../thunks/getMyAnimations')

describe('Login Component', () => {
  let loginUserMock
  let mockGetMyAnimations
  let wrapper
  
  beforeEach(() => {
    mockGetMyAnimations = jest.fn()
    loginUserMock = jest.fn().mockImplementation((param) => {
      return {status: 'success', data: {id: 1}}
    })
    wrapper = shallow(<Login loginUser={loginUserMock} user={{name: null}} getMyAnimations={mockGetMyAnimations}/>)
  })
  
  it('matches the snapshot ', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should match the snapshot when user is logged in', () => {
    wrapper = shallow(<Login loginUser={loginUserMock} user={{name: 'jake'}} getMyAnimations={mockGetMyAnimations}/>)

    expect(wrapper).toMatchSnapshot()
  })
  
  it('calls handleChange when e-mail is changed', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    const mockEvent = { target: { value: 'something@gmail.com' } }
    wrapper.find('.email').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalled()
  })
  
  it('calls handleChange when password is changed', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    const mockEvent = { target: { value: 'password' } }
    wrapper.find('.password').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalled()
    
  })
  
  it('updates state when handleChange is called', () => {
    const mockEvent = { target: { name: 'email', value: 'something@gmail.com' } }
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('email')).toBe('something@gmail.com')
  })
  
  it('calls handleSubmit onSubmit of the form', () => { 
    const spy = spyOn(wrapper.instance(), 'handleSubmit')
    const mockEvent = { preventDefault: jest.fn() }
    wrapper.instance().forceUpdate()
    wrapper.find('form').simulate('submit', mockEvent)
    expect(spy).toHaveBeenCalled()
  })
  
  describe('handleSubmit', () => {
    const mockEvent = {preventDefault: jest.fn()}

    beforeEach(() => {
      wrapper.state().email = 'jake@gmail.com'
      wrapper.state().password = 'jake'
    })

    it('Should call login user from props', async () => {
      const expected = {"email": "jake@gmail.com", "password": "jake"}

      await wrapper.instance().handleSubmit(mockEvent)
      expect(loginUserMock).toHaveBeenCalledWith(expected)      
    })

    it('should call getMyAnimations with the correct params', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })
    
    it('should set state incorrect to true if incorrect login', async () => {
      loginUserMock = jest.fn().mockImplementation((param) => {
        return {status: 'failure', data: {id: 1}}
      })
      wrapper = shallow(<Login loginUser={loginUserMock} user={{name: null}} getMyAnimations={mockGetMyAnimations}/>)
      await wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state().incorrect).toEqual(true)
    })
  })

  describe('handleChange', () => {
    
    it('should update state', () => {
      const mockEvent = {target: {value: 'jake', name: 'password'}}
      const expected = 'jake'
      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state().password).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with a signIn action when loginUser is called', async () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = await loginUser({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.loginUser({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a getMyAnimations action when getMyAnimations is called', async () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = await getMyAnimations(1)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.getMyAnimations(1)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  describe('mapStateToProps', () => {
    
    it('should return a props object with a user property', () => {
      const mockState = {user: {name: 'jake', id: 1}}
      const expected = {user: {name: 'jake', id: 1}}

      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })
  
}) 
