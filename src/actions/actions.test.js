import * as actions from './actions'

describe('actions', () => {

  describe('signIn', () => {

    it('should return a type of SIGN_IN with a user', () => {
      const mockUser = {name: 'Jake', id: 1}
      const expected = {type: 'SIGN_IN', user: mockUser}

      expect(actions.signIn(mockUser)).toEqual(expected)
    })
  })

  describe('signOut', () => {
    
    it('should return a type of SIGN_OUT', () => {
      const expected = {type: 'SIGN_OUT'}

      expect(actions.signOut()).toEqual(expected)
    })
  })

  describe('LoadPrebuiltAnimations', () => {

    it('should return a type of LOAD_PREBUILT_ANIMATIONS with an array of animations', () => {
      const mockPrebuilt = [{name: 'ani_one'}, {name: 'ani_two'}]
      const expected = {type: 'LOAD_PREBUILT_ANIMATIONS', prebuiltAnimations: mockPrebuilt}

      expect(actions.loadPrebuiltAnimations(mockPrebuilt)).toEqual(expected)
    })
  })

  describe('updateCurrentAnimation', () => {
    
    it('should return a type of UPDATE_CURRENT_ANIMATION with an animation', () => {
      const mockAnimation = {name: 'ani_one'}
      const expected = {type: 'UPDATE_CURRENT_ANIMATION', animation: mockAnimation}

      expect(actions.updateCurrentAnimation(mockAnimation)).toEqual(expected)
    })
  })

  describe('saveOriginalAnimation', () => {
    it('should return a type of SAVE_ORIGINAL_ANIMATION with an animation', () => {
      const mockAnimation = "{name: 'ani_one'}"
      const expected = {type: 'SAVE_ORIGINAL_ANIMATION', animation: mockAnimation}

      expect(actions.saveOriginalAnimation(mockAnimation)).toEqual(expected)
    })
  })

  describe('loadMyAnimations', () => {

    it('should return a type of LOAD_MY_ANIMATIONS with an array of animations', () => {
      const mockMyAnimations = [{name: 'ani_one'}, {name: 'ani_two'}]
      const expected = {type: 'LOAD_MY_ANIMATIONS', myAnimations: mockMyAnimations}

      expect(actions.loadMyAnimations(mockMyAnimations)).toEqual(expected)
    })
  })

  describe('deleteMyAnimation', () => {
    
    it('should return a type of DELETE_MY_ANIMATION with an id', () => {
      const mockID = 1
      const expected = {type: 'DELETE_MY_ANIMATION', id: mockID}

      expect(actions.deleteMyAnimation(mockID)).toEqual(expected)
    })
  })

  describe('selectAnimationForEdit', () => {

    it('should return a type of SELECT_ANIMATION_FOR_EDIT with an animation', () => {
      const mockAnimation = {name: 'ani_one'}
      const expected = {type: 'SELECT_ANIMATION_FOR_EDIT', animation: mockAnimation}

      expect(actions.selectAnimationForEdit(mockAnimation)).toEqual(expected)
    })
  })

  describe('removeAnimationForEdit', () => {

    it('should return a type of REMOVE_ANIMATION_FOR_EDIT with an animation', () => {
      const expected = {type: 'REMOVE_ANIMATION_FOR_EDIT'}

      expect(actions.removeAnimationForEdit()).toEqual(expected)
    })
  })
})