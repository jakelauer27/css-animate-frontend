const animationForEditReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SELECT_ANIMATION_FOR_EDIT':
      return action.animation
    case 'REMOVE_ANIMATION_FOR_EDIT':
      return {}
    default: 
      return state
  }
}

export default animationForEditReducer 