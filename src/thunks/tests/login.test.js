import { loginUser } from '../login'
import { signIn } from '../../actions/actions'

describe('loginUser', () => {
  let mockDispatch
  let mockUser 

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockUser = { id: 1, name: 'Taylor', password: 'password', email: 't@gmail.com'}
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: mockUser
      })
    }))
  })

  it('should call fetch with the correct params', async () => {
    const expectedUrl = 'https://css-animate-backend.herokuapp.com/api/users/'
    const expectedObject = {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const thunk = loginUser(mockUser)
    await thunk(mockDispatch)
    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedObject)
  })

  it('should dispatch signIn', async () => {
    const thunk = loginUser(mockUser)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(signIn(mockUser))
  })

  it('should return an error message', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    const thunk = loginUser(mockUser)
    const result = await thunk(mockDispatch)
    expect(result).toEqual(Error('Error'))
  })
})