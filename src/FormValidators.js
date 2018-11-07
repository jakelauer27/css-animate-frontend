const animationPropValidator = {
  'duration': RegExp('[1-9][0-9]{3}(s|ms)(?!.)|[1-9][0-9]{2}(s|ms)(?!.)|[1-9][0-9](s|ms)(?!.)|[0-9](s|ms)(?!.)'),
  'timing-function': RegExp('\w*(?<!.)linear(?!.)|\w*(?<!.)ease(?!.)|\w*(?<!.)ease-in(?!.)|\w*(?<!.)ease-out(?!.)|\w*(?<!.)ease-in-out(?!.)'),
  'delay': RegExp('[1-9][0-9]{3}(s|ms)(?!.)|[1-9][0-9]{2}(s|ms)(?!.)|[1-9][0-9](s|ms)(?!.)|[0-9](s|ms)(?!.)'),
  'iteration-count': RegExp('\w*(?<!.)infinite(?!.)|(?<!.)[0-9](?!.)|(?<!.)[1-9][0-9](?!.)'),
  'direction': RegExp('\w*(?<!.)normal(?!.)|\w*(?<!.)reverse(?!.)|\w*(?<!.)alternate(?!.)|\w*(?<!.)alternate-reverse(?!.)'),
  'fill-mode': RegExp('\w*(?<!.)forwards(?!.)|\w*(?<!.)none(?!.)|\w*(?<!.)backwards(?!.)|\w*(?<!.)both(?!.)')

}

export default animationPropValidator;