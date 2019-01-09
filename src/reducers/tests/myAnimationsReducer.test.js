import myAnimationsReducer from '../myAnimationsReducer'
import { loadMyAnimations, deleteMyAnimation } from '../../actions/actions'

describe('animationForEditReducer', () => {

  it('should return default state', () => {
    const expected = []
    const result = myAnimationsReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should load my animations', () => {
    const mockState = []
    const mockAnimations = [{name: 'jake'}, {name: 'george'}]
    const expected = [{name: 'jake'}, {name: 'george'}]
    const result = myAnimationsReducer(mockState, loadMyAnimations(mockAnimations))

    expect(result).toEqual(expected)
  })

  it('should delete an animation', () => {
    const mockState = [{name: 'jake', id: 1}, {name: 'george', id: 2}, {name: 'george', id: 3}]
    const expected = [{name: 'jake', id: 1}, {name: 'george', id: 3}]
    const result = myAnimationsReducer(mockState, deleteMyAnimation(2))

    expect(result).toEqual(expected)
  })

  it('should return state if deleting the last animation', () => {
    const mockState = [{name: 'george', id: 2}]
    const expected = []
    const result = myAnimationsReducer(mockState, deleteMyAnimation(2))

    expect(result).toEqual(expected)
  })
})