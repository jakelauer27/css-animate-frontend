import { getMyAnimations } from '../getMyAnimations'
import { loadMyAnimations } from '../../actions/actions'

describe('getMyAnimations', () => {
  let mockDispatch
  let mockAnimations
  
  beforeEach(() => {
    mockAnimations = [{name: 'slide'}, {name: 'float'}]
    mockDispatch = jest.fn()
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: mockAnimations
      })
    }))
  })

  it('should call fetch with the correct url', async () => {
    const thunk = getMyAnimations(1)
    await thunk(mockDispatch)
    const expected = 'http://localhost:3000/api/users/1/animations'

    expect(window.fetch).toHaveBeenCalledWith(expected)
  })

  it('should dispatch loadMyAnimations with the correct params', async () => {
    const thunk = getMyAnimations(1)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(loadMyAnimations(mockAnimations))
  })

  it('should return an error message', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    const thunk = getMyAnimations(1)
    const result = await thunk(mockDispatch)
    expect(result).toEqual(new Error('Error'))
  })
})