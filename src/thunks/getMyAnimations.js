import { loadMyAnimations, isLoading } from '../actions/actions'

export const getMyAnimations = (user_id) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(`https://css-animate-backend.herokuapp.com/api/users/${user_id}/animations`)
      const data = await response.json()
      dispatch(loadMyAnimations(data.data))
      dispatch(isLoading(false))
    } catch(error) {
      return new Error(error)
    }
  }
}