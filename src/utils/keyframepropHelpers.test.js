import * as helpers from './formValidatorHelpers'
import { transformInput, colorInput } from './keyframepropHelpers' 

jest.mock('./formValidatorHelpers')

describe('transformInput', () => {
  let mockTarget
  
  beforeEach(() => {
    helpers.invalidInput = jest.fn()
    helpers.validInput = jest.fn()
    mockTarget = {classList: ['', 'transform']}
  })

  it('should call invalidInput is no input', () => {
    transformInput(mockTarget, '')

    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call invalidInput is invalid', () => {
    transformInput(mockTarget, 'translateX(30s0px)')

    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call invalidInput if multiple argument input is invalid', () => {
    transformInput(mockTarget, 'translateX(300px) rotate(30degs)')
    
    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call validInput input is valid', () => {
    transformInput(mockTarget, 'translateY(-300px) rotate(30deg)')
    expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
  })
})

describe('colorInput', () => {
  let mockTarget
  
  beforeEach(() => {
    helpers.invalidInput = jest.fn()
    helpers.validInput = jest.fn()
    mockTarget = {classList: ['', 'color']}
  })

  it('should call valid input if it passes rgb test', () => {
    colorInput(mockTarget, 'rgb(34, 34, 34)')
    expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call invalid input if it fails rgb test', () => {
    colorInput(mockTarget, 'rgb(3sdf4, 34, 34)')
    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call valid input if it passes hex test', () => {
    colorInput(mockTarget, '#7A0707')
    expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call invalid input if it fails hex test', () => {
    colorInput(mockTarget, '#lkjsdf')
    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call valid input if it passes namedcolor test', () => {
    colorInput(mockTarget, 'red')
    expect(helpers.validInput).toHaveBeenCalledWith(mockTarget)
  })

  it('should call invalid input if it fails namedcolor test', () => {
    colorInput(mockTarget, 'kjsdf')
    expect(helpers.invalidInput).toHaveBeenCalledWith(mockTarget)
  })
})