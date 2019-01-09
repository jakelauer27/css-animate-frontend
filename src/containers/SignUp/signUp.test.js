import { shallow } from 'enzyme'
import { SignUp, mapDispatchToProps } from './Signup'
import React from 'react'
import { addUser } from '../../utils/apiCalls/apiCalls'
import { loginUser } from '../../thunks/login'
import { getMyAnimations } from '../../thunks/getMyAnimations'

jest.mock('../../utils/apiCalls/apiCalls')
jest.mock('../../thunks/getMyAnimations')
jest.mock('../../thunks/login')

beforeEach(() => {
  addUser.mockImplementation(() => ({error: false}))
})

describe('SignUp Component', () => {
  let wrapper
  let mockLoginUser
  let mockGetMyAnimations

  beforeEach(() => {
    mockLoginUser = jest.fn().mockImplementation(() => ({
      data: {id: 1}
    }))
    mockGetMyAnimations = jest.fn()
    wrapper = shallow(<SignUp loginUser={mockLoginUser} getMyAnimations={mockGetMyAnimations}/>)
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot if it renders the redirect', () => {
    wrapper.state().validUser = true
    expect(wrapper).toMatchSnapshot()
  })

  it('Should have a default state', () => {
    const expected = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      duplicateUser: false,
      validUser: false,
      formComplete: false,
      passwordsMatch: true,
      validEmail: true
    }

    expect(wrapper.state()).toEqual(expected)
  })

  describe('emailValidation', () => {
    it('should return true if valid email', () => {
      const email = wrapper.state().email = "ashley@gmail.com"
      const result = wrapper.instance().emailValidation(email)
      expect(result).toEqual(true)
    })

    it('should return false if valid email', () => {
      const email = wrapper.state().email = "ashlesladh"
      const result = wrapper.instance().emailValidation(email)
      expect(result).toEqual(false)
    })
  })

  describe('handleChange', () => {
    const mockEvent = {target: {name: 'email', value: 'jake@gmail.com'}}
  
    it('Should update name in state', () => {
      const expected = 'jake@gmail.com'

      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state().email).toEqual(expected)
    })

    it('Should call checkFormCompletion', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'checkFormCompletion')
      await wrapper.instance().handleChange(mockEvent)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('checkFormCompletion', () => {
    it('Should set formcomplete in state to true if all fields are complete', () => {  
      wrapper.state().name = 'jake'
      wrapper.state().email = 'jake@gmail.com'
      wrapper.state().password = 'jake1'
      wrapper.state().confirmPassword = 'jake1'

      const expected = true
  
      wrapper.instance().checkFormCompletion()
      expect(wrapper.state().formComplete).toEqual(expected)
    })
  })

  describe('handleSubmit', async () => {
    const mockEvent = {preventDefault: jest.fn()}
    
    beforeEach(() => {
      wrapper.state().name = 'jake'
      wrapper.state().email = 'jake@gmail.com'
      wrapper.state().password = 'jake1'
      wrapper.state().confirmPassword = 'jake1'
    })

    it('should call emailValidation', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'emailValidation')
      await wrapper.instance().handleSubmit(mockEvent)
      expect(spy).toHaveBeenCalled()
    })

    it('should setState if email is invalid', async () => {
      wrapper.state().email = "aashdkj"
      await wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state().validEmail).toBe(false)
      expect(wrapper.state().duplicateUser).toBe(false)
      expect(wrapper.state().passwordsMatch).toBe(true)
    })

    it('Should check if passwords match', async () => {
      wrapper.state().password = 'jake'
      wrapper.state().confirmPassword = 'jake1'
      await wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state().passwordsMatch).toBe(false)
      expect(wrapper.state().duplicateUser).toBe(false)
    })

    it('Should call addUser if passwords match', async () => {
      const mockUser = {name: 'jake', email: 'jake@gmail.com', password: 'jake1'}

      await wrapper.instance().handleSubmit(mockEvent)

      expect(addUser).toHaveBeenCalledWith(mockUser)
    })

    it('should set validUser to true if everything is ok', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state().validUser).toBe(true)
    })

    it('should call getMyAnimations everything is ok', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockGetMyAnimations).toHaveBeenCalledWith(1)
    })

    it('should call loginUser if everything is ok', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      expect(mockLoginUser).toHaveBeenCalledWith({"email": "jake@gmail.com", "password": "jake1"})
    })

    it('should check if user is a duplicate', async () => {
      addUser.mockImplementation(() => ({error: true}))

      await wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state().validUser).toBe(false)
      expect(wrapper.state().duplicateUser).toBe(true)
      expect(wrapper.state().passwordsMatch).toBe(true)
    })
  })

  describe('mapDispatchToProps', () => {
    const mockUser = {name: 'jake', id: 1}

    it('should return a props object with a loginUser property', async () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = await loginUser(mockUser)
      const mappedProps = mapDispatchToProps(mockDispatch)
      
      mappedProps.loginUser()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return a props object with a getMyAnimations property', async () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = await getMyAnimations(1)
      const mappedProps = mapDispatchToProps(mockDispatch)
      
      mappedProps.getMyAnimations()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})