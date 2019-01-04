const defaultState = {
  name: null,
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      const { user } = action
      return {name: user.name, id: user.id}
    case 'SIGN_OUT':
      return {}
    default: return state
  } 
}

export default userReducer