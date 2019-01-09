import { animationPropRegex, keyframeStageRegex, keyframeValueRegex, keyframesPropertyRegex } from './regexpressions'
import { invalidInput, validInput } from './formValidatorHelpers'
import { colorInput, transformInput } from './keyframepropHelpers.js'

export const validateAnimationProp = (target, inputValue) => {
  if (!animationPropRegex[target.classList[1]].test(inputValue)) {
    invalidInput(target)
    return false
  } else {
    validInput(target)
    return true
  }
}

export const keyframeProperty = ( target, inputValue) => {
  if(!inputValue) {return false}
  if(!target) {
    if (!keyframesPropertyRegex.test(inputValue)) {
      return false
    } else { 
      return true
    }
  }

  if (!keyframesPropertyRegex.test(inputValue)) {
    invalidInput(target)
    return false
  } else {
    validInput(target)
    return true
  }
}

export const keyframeValue = (target, inputValue) => {
  if (target.classList[1] === 'transform') {
    return transformInput(target, inputValue)

  }
  if (target.classList[1] === 'background-color') {
    return colorInput(target, inputValue)
  }
  if (!keyframeValueRegex[target.classList[1]].test(inputValue)) {
    invalidInput(target)
    return false
  } else {  
    validInput(target)
    return true
  }
}

export const keyframeStage = (target, inputValue) => {
  if (!keyframeStageRegex.test(inputValue)) {
    invalidInput(target)
    return false
  } else {
    validInput(target)
    return true
  }
}



