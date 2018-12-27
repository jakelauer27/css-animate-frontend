import { combineReducers } from 'redux'
import animationReducer from './animationReducer'

const rootReducer = combineReducers({
  animation: animationReducer
})

export default rootReducer