const currentAnimationReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_CURRENT_ANIMATION':
      return action.animation
    default: 
      return state
  }
}

export default currentAnimationReducer