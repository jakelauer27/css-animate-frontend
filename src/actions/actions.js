export const loadAnimation = (animation) => ({
  type: 'LOAD_ANIMATION',
  animation
})

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



