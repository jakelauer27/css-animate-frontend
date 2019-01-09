import { validInput, invalidInput } from '../formValidatorHelpers'

describe('validatorhelpers', () => {
  let mockTarget

  beforeEach(() => {
    mockTarget = {classList: ['', '0%']}
    mockTarget.classList.add = jest.fn()
    mockTarget.classList.remove = jest.fn()
  })

  describe('invalidInput', () => {
    it('should add a class of red to target', () => {
      invalidInput(mockTarget)
      expect(mockTarget.classList.add).toHaveBeenCalledWith('red')
    })
  })

  describe('validInput', () => {
    it('should remove a class of red to target', () => {
      validInput(mockTarget)
      expect(mockTarget.classList.remove).toHaveBeenCalledWith('red')
    })
  })
})