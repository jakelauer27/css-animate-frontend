import { loadMyAnimations } from '../actions/actions'

export const getMyAnimations = (user_id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user_id}/animations`)
      const data = await response.json()
      dispatch(loadMyAnimations(data.data))
    } catch(error) {
      return new Error(error)
    }
  }
}