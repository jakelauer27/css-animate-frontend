const defaultState = {keyframes:{name: null}}

export const animationReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'LOAD_ANIMATION':
      return action.animation
    default:
      return state
  }
}

export default animationReducer