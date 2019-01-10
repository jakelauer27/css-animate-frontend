import { invalidInput, validInput } from './formValidatorHelpers'
import { transformRegex, colorRegex } from './regexpressions'


export const colorInput = (target, inputValue) => {
  if (inputValue.slice(0, 3) === 'rgb') {
    if (!colorRegex.rgb.test(inputValue)) {
      return invalidInput(target)
    } else { 
      return validInput(target)
    }
  }
  if (inputValue[0] === '#') {
    if (!colorRegex['#'].test(inputValue)) {
      return invalidInput(target)
    } else {
      return validInput(target)
    }
  }
  if (!colorRegex.color.test(inputValue)) {
    return invalidInput(target)
  }
  return validInput(target)
}

export const transformInput = (target, inputValue) => {
  let args = inputValue.split(' ')
  for (let i = 0; i < args.length; i++) {
    let type = args[i].split('(')
    if (type[0][type[0].length - 1] === 'Y' || type[0][type[0].length - 1] === 'X') {
      type[0] = type[0].slice(0, -1)
    }
    if (!transformRegex[type[0]]) {
      return invalidInput(target)
    }
    if (!transformRegex[type[0]].test(args[i])) {
      return invalidInput(target)
    }
  }
  return validInput(target)
}