import { deleteMyAnimation } from '../actions/actions'

export const deleteAnimation = (user_id, animation_id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://css-animate-backend.herokuapp.com/api/users/${user_id}/animations/${animation_id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      dispatch(deleteMyAnimation(animation_id))
      return data
    } catch (error) {
      return new Error(error)
    }
  } 
}