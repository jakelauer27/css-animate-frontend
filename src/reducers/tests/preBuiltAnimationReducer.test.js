import prebuiltAnimationReducer from '../preBuiltAnimationReducer'
import { loadPrebuiltAnimations } from '../../actions/actions'

describe('prebuiltAnimationReducer', () => {

  it('should return default state', () => {
    const expected = []
    const result = prebuiltAnimationReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should load prebuilt animations', () => {
    const mockState = []
    const mockAnimations = [{name: 'jake'}, {name: 'george'}]
    const expected = [{name: 'jake'}, {name: 'george'}]
    const result = prebuiltAnimationReducer(mockState, loadPrebuiltAnimations(mockAnimations))

    expect(result).toEqual(expected)
  })
})