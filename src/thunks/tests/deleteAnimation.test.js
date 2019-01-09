import { deleteAnimation } from '../deleteAnimation'
import { deleteMyAnimation } from '../../actions/actions'

describe('deleteAnimation', () => {
  let mockDispatch
  
  beforeEach(() => {
    mockDispatch = jest.fn()
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        message: 'success'
      })
    }))
  })

  it('should call fetch with the correct url', async () => {

    const thunk = deleteAnimation(1, 2)
    await thunk(mockDispatch)
    const expected = 'http://localhost:3000/api/users/1/animations/2'

    expect(window.fetch).toHaveBeenCalledWith(expected, {method: 'DELETE'})
  })

  it('should dispatch deleteMyAnimation with the correct params', async () => {
    const thunk = deleteAnimation(1, 2)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(deleteMyAnimation(2))
  })

  it('should return an error message', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    const thunk = deleteAnimation(1, 2)
    const result = await thunk(mockDispatch)
    expect(result).toEqual(new Error('Error'))
  })
})