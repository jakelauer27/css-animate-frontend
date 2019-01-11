import { loadPrebuiltAnimations } from '../actions/actions'

export const getPrebuiltAnimations = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://css-animate-backend.herokuapp.com/api/users/animations")
      const data = await response.json()
      dispatch(loadPrebuiltAnimations(data.data))
    } catch(error) {
      return new Error(error)
    }
  }
}