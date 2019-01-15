import { combineReducers } from 'redux'
import prebuiltAnimationReducer from './preBuiltAnimationReducer'
import userReducer from './userReducer'
import originalAnimationReducer from './originalAnimationReducer'
import currentAnimationReducer from './currentAnimationReducer';
import myAnimationsReducer from './myAnimationsReducer';
import animationForEditReducer from './animationForEditReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  currentAnimation: currentAnimationReducer,
  originalAnimation: originalAnimationReducer,
  animationForEdit: animationForEditReducer,
  prebuiltAnimations: prebuiltAnimationReducer,
  myAnimations: myAnimationsReducer,
  user: userReducer,
  isLoading: loadingReducer
})

export default rootReducer