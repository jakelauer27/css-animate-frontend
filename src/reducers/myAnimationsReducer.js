export const myAnimationsReducer = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_MY_ANIMATIONS':
      return action.myAnimations
    case 'DELETE_MY_ANIMATION':
    const currentList = [...state] 
    const newList = currentList.filter(animation => { return animation.id !== action.id }) || state
      return newList
    default:
      return state
  }
}