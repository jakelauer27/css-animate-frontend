import { loadPrebuiltAnimations, isLoading } from '../actions/actions'

export const getPrebuiltAnimations = () => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch("https://css-animate-backend.herokuapp.com/api/users/animations")
      const data = await response.json()
      dispatch(loadPrebuiltAnimations(data.data))
      dispatch(isLoading(false))
    } catch(error) {
      return new Error(error)
    }
  }
}