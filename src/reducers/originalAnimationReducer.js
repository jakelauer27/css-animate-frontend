const originalAnimationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SAVE_ORIGINAL_ANIMATION':
      return action.animation
    default:
      return state
  }
}

export default originalAnimationReducer