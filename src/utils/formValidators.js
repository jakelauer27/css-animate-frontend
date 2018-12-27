import { animationPropRegex, keyframeStageRegex, keyframeValueRegex, transformRegex, colorRegex } from './regexpressions'


export const validateAnimationProp = (target, inputValue) => {
  if (!animationPropRegex[target.classList[1]].test(inputValue)) {
    target.classList.add('red')
    document.querySelector('.play-btn').setAttribute('disabled', true)
  } else {
    target.classList.remove('red')
    document.querySelector('.play-btn').removeAttribute('disabled')
  }
}

export const keyframeStage = (target, inputValue) => {
  if (!keyframeStageRegex.test(inputValue)) {
    target.classList.add('red');
    document.querySelector('.play-btn').setAttribute('disabled', true);
  } else {
    target.classList.remove('red');
    document.querySelector('.play-btn').removeAttribute('disabled');
  }
}

export const transformInput = (target, inputValue) => {
  let args = inputValue.split(' ');
  for (let i = 0; i < args.length; i++) {
    let type = args[i].split('(');
    if (type[0][type[0].length - 1] === 'Y' || type[0][type[0].length - 1] === 'X') {
      type[0] = type[0].slice(0, -1);
    }
    if (!transformRegex[type[0]]) {
      target.classList.add('red');
      document.querySelector('.play-btn').setAttribute('disabled', true);
      break;
    }
    if (!transformRegex[type[0]].test(args[i])) {
      target.classList.add('red');
      document.querySelector('.play-btn').setAttribute('disabled', true);
      break;
    }
      target.classList.remove('red');
      document.querySelector('.play-btn').removeAttribute('disabled');
  }
}

export const colorInput = (target, inputValue) => {
  if (inputValue.slice(0, 3) === 'rgb') {
    if (!colorRegex.rgb.test(inputValue)) {
      target.classList.add('red');
      document.querySelector('.play-btn').setAttribute('disabled', true);
      return
    } else {
      target.classList.remove('red');
      document.querySelector('.play-btn').removeAttribute('disabled');
      return
    }
  }
  if (inputValue[0] === '#') {
    if (!colorRegex['#'].test(inputValue)) {
      target.classList.add('red');
      document.querySelector('.play-btn').setAttribute('disabled', true);
      return
    } else {
      target.classList.remove('red');
      document.querySelector('.play-btn').removeAttribute('disabled');
      return
    }
  }
  if (!colorRegex.color.test(inputValue)) {
    target.classList.add('red');
    document.querySelector('.play-btn').setAttribute('disabled', true);
    return
  }
  target.classList.remove('red');
  document.querySelector('.play-btn').removeAttribute('disabled');
}


export const keyframeValue = (target, inputValue) => {
  if (target.classList[1] === 'transform') {
    transformInput(target, inputValue);
    return;
  }
  if (target.classList[1] === 'background-color') {
    this.colorInput(target, inputValue);
    return;
  }
  if (!keyframeValueRegex[target.classList[1]].test(inputValue)) {
    target.classList.add('red');
    document.querySelector('.play-btn').setAttribute('disabled', true);
  } else {
    target.classList.remove('red');
    document.querySelector('.play-btn').removeAttribute('disabled');
  }
}