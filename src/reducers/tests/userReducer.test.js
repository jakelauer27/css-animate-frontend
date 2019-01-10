import userReducer from '../userReducer'
import { signIn, signOut } from '../../actions/actions'

describe('userReducer', () => {

  it('should return default state', () => {
    const expected = {name: null}
    const result = userReducer(undefined, {})

    expect(result).toEqual(expected)
  })

  it('should sign user in', () => {
    const expected = {name: 'jake', id: 1}
    const mockUser = {name: 'jake', id: 1, email:'jake@jake.com', password: 'starwars'}
    const result = userReducer(undefined, signIn(mockUser))

    expect(result).toEqual(expected)
  }) 

  it('should sign user out', () => {
    const expected = {}
    const result = userReducer(undefined, signOut())

    expect(result).toEqual(expected)
  })
})