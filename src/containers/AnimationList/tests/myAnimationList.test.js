import { MyAnimationList, mapStateToProps, mapDispatchToProps } from '../MyAnimationList'
import { shallow } from 'enzyme'
import React from 'react'
import { deleteAnimation } from '../../../thunks/deleteAnimation'
import { selectAnimationForEdit } from '../../../actions/actions'

jest.mock('../../../actions/actions')
jest.mock('../../../thunks/deleteAnimation')

describe('MyAnimationList', () => {
  let mockEvent
  let wrapper
  let mockDeleteAnimation
  let mockSelectAnimationForEdit
  const mockAnimations = [{id: 1, 'ani-name': 'slideIn' },{id: 2, 'ani-name': 'rotateIn' }]
  const mockCurrentAnimation = {id: 2, 'ani-name': 'rotateIn' }
  const mockUser = 1 

  beforeEach(() => {
    mockEvent = {target: {classList: ['2', 'test2']}}
    mockEvent.target.classList.add = jest.fn()
    mockEvent.target.classList.remove = jest.fn()
    mockDeleteAnimation = jest.fn()
    mockSelectAnimationForEdit = jest.fn()
    wrapper = shallow(
      <MyAnimationList 
        myAnimations={mockAnimations}
        currentAnimation={mockCurrentAnimation}
        user={mockUser}
        deleteAnimation={mockDeleteAnimation}
        selectAnimationForEdit={mockSelectAnimationForEdit}
      />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if no user is logged in', () => {
    wrapper = shallow(
      <MyAnimationList 
        myAnimations={mockAnimations}
        currentAnimation={mockCurrentAnimation}
        user={null}
        deleteAnimation={mockDeleteAnimation}
        selectAnimationForEdit={mockSelectAnimationForEdit}
      />)
      expect(wrapper).toMatchSnapshot()
  })

  it('should run select animation when an animation is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'selectAnimation')
    wrapper.find('li.animation-li.selected-animation').simulate('click', mockEvent)

    expect(spy).toHaveBeenCalled()
  })

  it('should run delete animation when a trash icon is clicked', () => {
    const singleItemMockAnimations = [{id: 1, 'ani-name': 'slideIn' }]
    wrapper = shallow(
      <MyAnimationList 
        myAnimations={singleItemMockAnimations}
        currentAnimation={mockCurrentAnimation}
        user={mockUser}
        deleteAnimation={mockDeleteAnimation}
        selectAnimationForEdit={mockSelectAnimationForEdit}
      />)
    const spy = jest.spyOn(wrapper.instance(), 'deleteAnimation')
    wrapper.find('.fa-trash-alt').simulate('click', mockEvent)
    expect(spy).toHaveBeenCalled()
  })

  it('should run edit animation when an edit icon is clicked', () => {
    const singleItemMockAnimations = [{id: 1, 'ani-name': 'slideIn' }]
    wrapper = shallow(
      <MyAnimationList 
        myAnimations={singleItemMockAnimations}
        currentAnimation={mockCurrentAnimation}
        user={mockUser}
        deleteAnimation={mockDeleteAnimation}
        selectAnimationForEdit={mockSelectAnimationForEdit}
      />)    
    const spy = jest.spyOn(wrapper.instance(), 'editAnimation')
    wrapper.find('.fa-edit').simulate('click', mockEvent)
    expect(spy).toHaveBeenCalled()
  })

  describe('selectAnimation', () => {
    
    beforeEach(() => {
      document.querySelectorAll = jest.fn().mockImplementation(() => {
        return [{classList: {remove: jest.fn()}}]
      })
    })

    it('should remove selected-animation class from all nodes', () => {
      wrapper.instance().selectAnimation(mockEvent)

      expect(document.querySelectorAll).toHaveBeenCalledWith('.animation-li')
    })

    it('should return early if click target was an icon', () => {
      mockEvent = {target: {classList: ['2', 'fas']}}
      wrapper.instance().selectAnimation(mockEvent)
      expect(document.querySelectorAll).not.toHaveBeenCalled()

    })
  })

  describe('deleteAnimation', () => {

    it('should call deleteAnimation with the an animation based on the click event', () => {
      const expectedAnimationId = 2
      const expectedUserId = 1
      wrapper.instance().deleteAnimation(mockEvent)

      expect(mockDeleteAnimation).toHaveBeenCalledWith(expectedUserId, expectedAnimationId)
    })
  })

  describe('editAnimation', () => {
    
    it('should call selectAnimationForEdit with the an animation based on the click event', () => {
      const expected = {id: 2, 'ani-name': 'rotateIn' }
      wrapper.instance().editAnimation(mockEvent)

      expect(mockSelectAnimationForEdit).toHaveBeenCalledWith(expected)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with a user, currentAnimation, and myAnimations property', () => {
      const mockState = {myAnimations: {keyframes: {name: 'slideInX'}}, user:{id: 1}, currentAnimation: {name: 'test'}}
      const expected = {myAnimations: {keyframes: {name: 'slideInX'}}, user: 1, currentAnimation: {name: 'test'}}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('calls dispatch with a deleteAnimation action when deleteAnimation is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = deleteAnimation(1 ,2)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteAnimation(1, 2)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a selectAnimationForEdit action when selectAnimationForEdit is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = selectAnimationForEdit({name: 'test'})
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.selectAnimationForEdit({name: 'test'})
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
