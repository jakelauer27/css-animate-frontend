export const signIn = (user) => ({
  type: 'SIGN_IN',
  user
})

export const signOut = () => ({
  type: 'SIGN_OUT'
})

export const loadPrebuiltAnimations = (prebuiltAnimations) => ({
  type: 'LOAD_PREBUILT_ANIMATIONS',
  prebuiltAnimations
})

export const updateCurrentAnimation = (animation) => ({
  type: 'UPDATE_CURRENT_ANIMATION',
  animation
})

export const saveOriginalAnimation = (animation) => ({
  type: 'SAVE_ORIGINAL_ANIMATION',
  animation
})

export const loadMyAnimations = (myAnimations) => ({
  type: 'LOAD_MY_ANIMATIONS',
  myAnimations
})

export const deleteMyAnimation = (id) => ({
  type: 'DELETE_MY_ANIMATION',
  id
})

export const selectAnimationForEdit = (animation) => ({
  type: 'SELECT_ANIMATION_FOR_EDIT',
  animation
})

export const removeAnimationForEdit = () => ({
  type: 'REMOVE_ANIMATION_FOR_EDIT'
})


