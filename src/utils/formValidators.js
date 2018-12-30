import { animationPropRegex, keyframeStageRegex, keyframeValueRegex } from './regexpressions'
import { invalidInput, validInput } from './formValidatorHelpers'
import { colorInput, transformInput } from './keyframepropHelpers.js'

export const validateAnimationProp = (target, inputValue) => {
  if (!animationPropRegex[target.classList[1]].test(inputValue)) {
    invalidInput(target)
  } else {
    validInput(target)
  }
}

export const keyframeValue = (target, inputValue) => {
  if (target.classList[1] === 'transform') {
    transformInput(target, inputValue)
    return
  }
  if (target.classList[1] === 'background-color') {
    colorInput(target, inputValue)
    return
  }
  if (!keyframeValueRegex[target.classList[1]].test(inputValue)) {
    invalidInput(target)
  } else {  
    validInput(target)
  }
}

export const keyframeStage = (target, inputValue) => {
  if (!keyframeStageRegex.test(inputValue)) {
    invalidInput(target)
  } else {
    validInput(target)
  }
}



