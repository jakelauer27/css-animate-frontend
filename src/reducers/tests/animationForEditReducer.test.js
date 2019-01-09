import animationForEditReducer from '../animationForEditReducer'
import { selectAnimationForEdit, removeAnimationForEdit } from '../../actions/actions'

describe('animationForEditReducer', () => {

  it('should return default state', () => {
    const expected = {}
    const result = animationForEditReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should select an animation for edit', () => {
    const mockState = {name: 'george'}
    const mockAnimation = {name: 'jake'}
    const expected = {name: 'jake'}
    const result = animationForEditReducer(mockState, selectAnimationForEdit(mockAnimation))

    expect(result).toEqual(expected)
  })

  it('should remove an animation for edit', () => {
    const mockState = {name: 'george'}
    const expected = {}
    const result = animationForEditReducer(mockState, removeAnimationForEdit())

    expect(result).toEqual(expected)
  })
})