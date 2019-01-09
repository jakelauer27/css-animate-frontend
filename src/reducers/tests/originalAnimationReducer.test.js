import originalAnimationReducer from '../originalAnimationReducer'
import { saveOriginalAnimation } from '../../actions/actions'

describe('originalAnimationReducer', () => {

  it('should return default state', () => {
    const expected = ''
    const result = originalAnimationReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should save original animation', () => {
    const mockState = "{name: 'george'}"
    const mockAnimation = "{name: 'jake'}"
    const expected = "{name: 'jake'}"
    const result = originalAnimationReducer(mockState, saveOriginalAnimation(mockAnimation))

    expect(result).toEqual(expected)
  })
})