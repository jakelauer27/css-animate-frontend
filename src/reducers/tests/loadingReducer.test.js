import loadingReducer from '../loadingReducer'
import { isLoading } from '../../actions/actions'

describe('loadingReducer', () => {

  it('should return default state', () => {
    const expected = false
    const result = loadingReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should update isLoading', () => {
    const mockState = false
    const expected = true
    const result = loadingReducer(mockState, isLoading(true))

    expect(result).toEqual(expected)
  })
})