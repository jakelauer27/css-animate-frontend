import { animationReducer } from './animationReducer'
import { loadAnimation } from '../actions/actions'


describe('animationReducer', () => {

  it('should return default state', () => {
    const expected = {keyframes:{name: null}}
    const result = animationReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return state with an animation', () => {
    const mockAnimation = {name: 'test', keyframes: {}, properties: {}}
    const expected = mockAnimation
    const result = animationReducer(undefined, loadAnimation(mockAnimation))
    expect(result).toEqual(expected)
  })
})