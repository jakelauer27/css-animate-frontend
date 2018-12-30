import { invalidInput, validInput } from './formValidatorHelpers'
import { transformRegex, colorRegex } from './regexpressions'


export const colorInput = (target, inputValue) => {
  if (inputValue.slice(0, 3) === 'rgb') {
    if (!colorRegex.rgb.test(inputValue)) {
      invalidInput(target)
      return
    } else { 
      validInput(target)
      return
    }
  }
  if (inputValue[0] === '#') {
    if (!colorRegex['#'].test(inputValue)) {
      invalidInput(target)
      return
    } else {
      validInput(target)
      return
    }
  }
  if (!colorRegex.color.test(inputValue)) {
    invalidInput(target)
    return
  }
  validInput(target)
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
      break
    }
    if (!transformRegex[type[0]].test(args[i])) {
      invalidInput(target)
      break
    }
      validInput(target)
  }
}