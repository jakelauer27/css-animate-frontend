import { signIn, isLoading } from '../actions/actions'

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch("https://css-animate-backend.herokuapp.com/api/users/", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(signIn(data.data))
      dispatch(isLoading(false))
      return data
    } catch(error) {
      return new Error(error)
    }
  }
}