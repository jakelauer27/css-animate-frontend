import currentAnimationReducer from '../currentAnimationReducer'
import { updateCurrentAnimation } from '../../actions/actions'

describe('currentAnimationReducer', () => {

  it('should return default state', () => {
    const expected = {}
    const result = currentAnimationReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should update current animation', () => {
    const mockState = {name: 'george'}
    const mockAnimation = {name: 'jake'}
    const expected = {name: 'jake'}
    const result = currentAnimationReducer(mockState, updateCurrentAnimation(mockAnimation))

    expect(result).toEqual(expected)
  })
})