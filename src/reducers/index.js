import { combineReducers } from 'redux'
import prebuiltAnimationReducer from './preBuiltAnimationReducer'
import userReducer from './userReducer'
import originalAnimationReducer from './originalAnimationReducer'
import currentAnimationReducer from './currentAnimationReducer';

const rootReducer = combineReducers({
  currentAnimation: currentAnimationReducer,
  originalAnimation: originalAnimationReducer,
  prebuiltAnimations: prebuiltAnimationReducer,
  user: userReducer
})

export default rootReducer