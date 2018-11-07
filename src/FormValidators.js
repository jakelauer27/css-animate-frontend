const animationPropValidator = {
  'duration': RegExp('(?<!.)(\\.)?[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|(?<!.)(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|(?<!.)(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|(?<!.)(\\.)?[0-9](s|ms)(?!.)'),
  'timing-function': RegExp('\w*(?<!.)linear(?!.)|\w*(?<!.)ease(?!.)|\w*(?<!.)ease-in(?!.)|\w*(?<!.)ease-out(?!.)|\w*(?<!.)ease-in-out(?!.)'),
  'delay': RegExp('(?<!.)(\\.)?[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|(?<!.)(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|(?<!.)(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|(?<!.)(\\.)?[0-9](s|ms)(?!.)'),
  'iteration-count': RegExp('\w*(?<!.)infinite(?!.)|(?<!.)[0-9](?!.)|(?<!.)[1-9][0-9](?!.)'),
  'direction': RegExp('\w*(?<!.)normal(?!.)|\w*(?<!.)reverse(?!.)|\w*(?<!.)alternate(?!.)|\w*(?<!.)alternate-reverse(?!.)'),
  'fill-mode': RegExp('\w*(?<!.)forwards(?!.)|\w*(?<!.)none(?!.)|\w*(?<!.)backwards(?!.)|\w*(?<!.)both(?!.)')
}

const keyframeStageValidator = RegExp('(?<!.)[1-9][0-9]{2}%(?!.)|(?<!.)[1-9][0-9]%(?!.)|(?<!.)[0-9]%(?!.)')


const keyframeValueValidator = {
  'transform': RegExp(),
  'opacity': RegExp('(?<!.)(\\.)?[0-1](?!.)'),
  'height': RegExp('(?<!.)[1-9][0-9]{3}(px|%|em)(?!.)|(?<!.)[1-9][0-9]{2}(px|%|em)(?!.)|(?<!.)[1-9][0-9](px|%|em)(?!.)|(?<!.)[0-9](px|%|em)(?!.)'),
  'display': RegExp('\w*(?<!.)none(?!.)|\w*(?<!.)block(?!.)|\w*(?<!.)inline(?!.)|\w*(?<!.)inline-block(?!.)'),
  'background-color': RegExp('/(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))/i'),
  'background-image': RegExp('\w*(?<!.)none(?!.)'),
}

export {animationPropValidator, keyframeStageValidator, keyframeValueValidator} ;