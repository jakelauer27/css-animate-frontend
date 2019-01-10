import { animationPropRegex, keyframeStageRegex, keyframeValueRegex, keyframesPropertyRegex } from './regexpressions'
import { invalidInput, validInput } from './formValidatorHelpers'
import { colorInput, transformInput } from './keyframepropHelpers.js'

export const validateAnimationProp = (target, inputValue) => {
  if (!animationPropRegex[target.classList[1]].test(inputValue)) {
    return invalidInput(target)
  } else {
    return validInput(target)
  }
}

export const keyframeProperty = ( target, inputValue) => {
  if(!inputValue) {return false}
  if(!target) {
    return keyframesPropertyRegex.test(inputValue)
  }

  if (!keyframesPropertyRegex.test(inputValue)) {
    return invalidInput(target)
  } else {
    return validInput(target)
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
    return invalidInput(target)
  } else {  
    return validInput(target)
  }
}

export const keyframeStage = (target, inputValue) => {
  if (!keyframeStageRegex.test(inputValue)) {
    return invalidInput(target)
  } else {
    return validInput(target)
  }
}



