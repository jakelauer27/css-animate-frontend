import { editMyAnimation } from '../actions/actions'

export const editAnimation = (user_id, animation_id, animation) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user_id}/animations/${animation_id}`, {
        method: 'PUT',
        body: JSON.stringify({user_id, animation_id, ani_name: animation.name, properties: animation.properties, keyframes: animation.keyframes}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = response.json()
      return data
    } catch(error) {
      return new Error(error)
    }
  }
}