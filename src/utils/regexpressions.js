const animationPropRegex = {
  'duration': RegExp('^[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|^(\\.)?[0-9](s|ms)(?!.)'),
  'timingFunction': RegExp('^linear(?!.)|^ease(?!.)|^ease-in(?!.)|^ease-out(?!.)|^ease-in-out(?!.)'),
  'delay': RegExp('^(\\.)?[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|^(\\.)?[0-9](s|ms)(?!.)'),
  'iterationCount': RegExp('^infinite(?!.)|^[0-9](?!.)|^[1-9][0-9](?!.)'),
  'direction': RegExp('^normal(?!.)|^reverse(?!.)|^alternate(?!.)|^alternate-reverse(?!.)'),
  'fillMode': RegExp('^forwards(?!.)|^none(?!.)|^backwards(?!.)|^both(?!.)')
}

const keyframeStageRegex= RegExp('^[1-9][0-9]{2}%(?!.)|^[1-9][0-9]%(?!.)|^[0-9]%(?!.)')

const keyframeValueRegex= {
  'opacity': RegExp('^[0-1](\\.)[0-9]([0-9])?(?!.)'),
  'height': RegExp('^[1-9][0-9]{3}(px|%|em)(?!.)|^[1-9][0-9]{2}(px|%|em)(?!.)|^[1-9][0-9](px|%|em)(?!.)|^[0-9](px|%|em)(?!.)'),
  'display': RegExp('^none(?!.)|^block(?!.)|^inline(?!.)|^inline-block(?!.)'),
  'background-image': RegExp('^none(?!.)'),
}

const transformRegex= {
  'rotate': RegExp('^rotate(X|Y)?[(]((-)?[0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9]|(-)?[1-9][0-9][0-9][0-9])deg(([-.s])?((-)?[0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9]|(-)?[1-9][0-9][0-9][0-9])deg)?[)](?!.)'),
  'translate': RegExp('^translate(X|Y)?[(](-)?([0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9])(%|px)(,([-.s])?(-)?([0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9])(%|px))?[)](?!.)'),
  'skew': RegExp('^skew(X|Y)?[(]((-)?[0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9]|(-)?[1-9][0-9][0-9][0-9])deg(, ([-.s])?((-)?[0-9]|(-)?[1-9][0-9]|(-)?[1-9][0-9][0-9]|(-)?[1-9][0-9][0-9][0-9])deg)?[)](?!.)'),
  'scale': RegExp('^scale(X|Y)?[(]((-)?[0-9](\\.)?[0-9]?|(-)?[0-9](\\.)?[0-9]|(-)?[0-9](\\.)?[0-9]?[0-9])(%)?(, ([-.s])?((-)?(\\.)?[0-9]|(-)?[1-9](\\.)?[0-9]|(-)?[1-9](\\.)?[0-9](\\.)?[0-9])(%)?)?[)](?!.)'),
  'none': RegExp('^none(?!.)'),
  'initial': RegExp('^initial(?!.)'),
  'inherit': RegExp('^inherit(?!.)'),
  'matrix': RegExp('^matrix[(](-)?[0-9][0-9]?[0-9]?,(-)?[0-9][0-9]?[0-9]?,(-)?[0-9][0-9]?[0-9]?,(-)?[0-9][0-9]?[0-9]?,(-)?[0-9][0-9]?[0-9]?,(-)?[0-9][0-9]?[0-9]?[)](?!.)'),
  'perspective': RegExp('^perspective[(][0-9][0-9]?[0-9]?[0-9]?(cm|rem|px)[)](?!.)')
}

const colorRegex= {
  'rgb': RegExp('^rgb[(]([0-9]|[1-9][0-9]|[1-2][0-9][0-9]), ([-.s])?([0-9]|[1-9][0-9]|[1-2][0-9][0-9]), ([-.s])?([0-9]|[1-9][0-9]|[1-2][0-9][0-9])[)](?!.)'),
  '#': RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$(?!.)'),
  'color': RegExp('^(aliceBlue|antiqueWhite|aqua|aquamarine|azure|beige|bisque|black|blanchedAlmond|blue|blueViolet|brown|burly|wood|cadetBlue|chartreuse|chocolate|coral|cornflowerBlue|cornsilk|crimson|cyan|darkBlue|darkCyan|darkGoldenRod|darkGray|darkGrey|darkGreen|darkKhaki|darkMagenta|darkOliveGreen|darkOrange|darkOrchid|darkRed|darkSalmon|darkSeaGreen|darkSlateBlue|darkSlateGray|darkSlateGrey|darkTurquoise|darkViolet|deepPink|deepSkyBlue|dimGray|dimGrey|dodgerBlue|fireBrick|floralWhite|forestGreen|fuchsia|gainsboro|ghostWhite|gold|goldenRod|gray|grey|green|greenYellow|honeyDew|hotPink|indianRed|indigo|ivory|khaki|lavender|lavenderBlush|lawnGreen|lemonChiffon|lightBlue|lightCoral|lightCyan|lightGoldenRodYellow|lightGray|lightGrey|lightGreen|lightPink|lightSalmon|lightSeaGreen|lightSkyBlue|lightSlateGray|lightSlateGrey|lightSteelBlue|lightYellow|lime|limeGreen|linen|magenta|maroon|mediumAquaMarine|mediumBlue|mediumOrchid|mediumPurple|mediusmSeaGreen|mediumSlateBlue|mediumSpringGreen|mediumTurquoise|mediumVioletRed|midnightBlue|mintCream|mistyRose|moccasin|navajoWhite|navy|oldLace|olive|oliveDrab|orange|orangeRed|orchid|paleGoldenRod|paleGreen|paleTurquiose|paleVioletRed|papayaWhip|peachPuff|peru|pink|plum|powderBlue|purple|rebeccaPurple|red|rosyBrown|royalBlue|saddleBrown|salmon|sandyBrown|seaGreen|seaSheel|sienna|silver|skyBlue|slateGray|slateGrey|snow|springGreen|steel|blue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whiteSmoke|yellow|yellowGreen)(?!.)')
}

export {animationPropRegex, keyframeStageRegex, keyframeValueRegex, transformRegex, colorRegex} ;