import * as formValidators from './formValidators.js'
import * as helpers from './formValidatorHelpers.js'
import * as keyframesHelpers from './keyframepropHelpers.js'
 
jest.mock('./formValidatorHelpers.js')
jest.mock('./keyframepropHelpers.js')

describe('FormValidators', () => {

  describe('keyframeValue', () => {
      let mockTarget
    
    beforeEach(() => {
      helpers.invalidInput = jest.fn()
      helpers.validInput = jest.fn()
      keyframesHelpers.colorInput = jest.fn()
      keyframesHelpers.transformInput = jest.fn()
    })
    
    it('should run transformInput if edited prop is transform', () => {
      mockTarget = {classList: ['', 'transform']}
      formValidators.keyframeValue(mockTarget, 'translateY(300px)')

      expect(keyframesHelpers.transformInput).toHaveBeenCalledWith(mockTarget,'translateY(300px)' )
    })

    it('should run colorInput if edited prop is background-color', () => {
      mockTarget = {classList: ['', 'background-color']}
      formValidators.keyframeValue(mockTarget, 'red')

      expect(keyframesHelpers.colorInput).toHaveBeenCalledWith(mockTarget, 'red')
    })
        
    it('should call invalidInput if it fails validation', () => {
      mockTarget = {classList: ['', 'opacity']}
      formValidators.keyframeValue(mockTarget, '6jsjke%')

      expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
    })

    it('should call validInput if it passes validation', () => {
      mockTarget = {classList: ['', 'height']}
      formValidators.keyframeValue(mockTarget, '600px')

      expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
    })

  })

  describe('validateAnimationProp', () => {
    let mockTarget

    beforeEach(() => {
      helpers.invalidInput = jest.fn()
      helpers.validInput = jest.fn()
      mockTarget = {classList: ['', 'duration']}
    })
    
    it('should call invalidInput if it fails validation', () => {
      formValidators.validateAnimationProp(mockTarget, '6jsjke%')

      expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
    })

    it('should call validInput if it passes validation', () => {
      formValidators.validateAnimationProp(mockTarget, '.6s')

      expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
    })
  })

  describe('keyframeStage', () => {
    let mockTarget

    beforeEach(() => {
      helpers.invalidInput = jest.fn()
      helpers.validInput = jest.fn()
      mockTarget = {classList: ['', '0%']}
    })

    it('should call invalidInput if it fails validation', () => {
      formValidators.keyframeStage(mockTarget, '6jsjke%')

      expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
    })

    it('should call validInput if it passes validation', () => {
      formValidators.keyframeStage(mockTarget, '66%')

      expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
    })
  })
})
