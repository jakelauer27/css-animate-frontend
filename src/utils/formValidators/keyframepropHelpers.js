import { invalidInput, validInput } from './formValidatorHelpers'
import { transformRegex, colorRegex } from './regexpressions'


export const colorInput = (target, inputValue) => {
  if (inputValue.slice(0, 3) === 'rgb') {
    if (!colorRegex.rgb.test(inputValue)) {
      invalidInput(target)
      return false
    } else { 
      validInput(target)
      return true
    }
  }
  if (inputValue[0] === '#') {
    if (!colorRegex['#'].test(inputValue)) {
      invalidInput(target)
      return false
    } else {
      validInput(target)
      return true
    }
  }
  if (!colorRegex.color.test(inputValue)) {
    invalidInput(target)
    return false
  }
  validInput(target)
  return true
}

export const transformInput = (target, inputValue) => {
  let args = inputValue.split(' ')
  for (let i = 0; i < args.length; i++) {
    let type = args[i].split('(')
    if (type[0][type[0].length - 1] === 'Y' || type[0][type[0].length - 1] === 'X') {
      type[0] = type[0].slice(0, -1)
    }
    if (!transformRegex[type[0]]) {
      invalidInput(target)
      return false
    }
    if (!transformRegex[type[0]].test(args[i])) {
      invalidInput(target)
      return false
    }
  }
  validInput(target)
  return true
}