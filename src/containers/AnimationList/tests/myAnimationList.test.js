import { MyAnimationList, mapStateToProps, mapDispatchToProps } from '../MyAnimationList'
import { shallow } from 'enzyme'
import React from 'react'

describe('MyAnimationList', () => {
  let wrapper
  let mockDeleteAnimation
  let mockSelectAnimationForEdit
  const mockAnimations = [{id: 1, 'ani-name': 'slideIn' },{id: 2, 'ani-name': 'rotateIn' }]
  const mockCurrentAnimation = {id: 2, 'ani-name': 'rotateIn' }
  const mockUser = 1 

  beforeEach(() => {
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
})
