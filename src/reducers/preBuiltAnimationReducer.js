const prebuiltAnimationReducer = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_PREBUILT_ANIMATIONS':
      return action.prebuiltAnimations
    default:
      return state
  }
}

export default prebuiltAnimationReducer