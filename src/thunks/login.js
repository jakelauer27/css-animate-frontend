import { signIn } from '../actions/actions'

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://css-animate-backend.herokuapp.com/api/users/", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(signIn(data.data))
      return data
    } catch(error) {
      return new Error(error)
    }
  }
}