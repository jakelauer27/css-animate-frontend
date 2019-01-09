const animationPropRegex = {
  'name': RegExp('.'),
  'duration': RegExp('^[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|^(\\.)?[0-9](s|ms)(?!.)'),
  'timingFunction': RegExp('^linear(?!.)|^ease(?!.)|^ease-in(?!.)|^ease-out(?!.)|^ease-in-out(?!.)'),
  'delay': RegExp('^(\\.)?[1-9](\\.)?[0-9]{3}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9]{2}(s|ms)(?!.)|^(\\.)?[1-9](\\.)?[0-9](s|ms)(?!.)|^(\\.)?[0-9](s|ms)(?!.)'),
  'iterationCount': RegExp('^infinite(?!.)|^[0-9](?!.)|^[1-9][0-9](?!.)'),
  'direction': RegExp('^normal(?!.)|^reverse(?!.)|^alternate(?!.)|^alternate-reverse(?!.)'),
  'fillMode': RegExp('^forwards(?!.)|^none(?!.)|^backwards(?!.)|^both(?!.)')
}

const keyframeStageRegex= RegExp('^[1-9][0-9]{2}%(?!.)|^[1-9][0-9]%(?!.)|^[0-9]%(?!.)')

const colorRegex= {
  'rgb': RegExp('^rgb[(]([0-9]|[1-9][0-9]|[1-2][0-9][0-9]), ([-.s])?([0-9]|[1-9][0-9]|[1-2][0-9][0-9]), ([-.s])?([0-9]|[1-9][0-9]|[1-2][0-9][0-9])[)](?!.)'),
  '#': RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$(?!.)'),
  'color': RegExp(`^(aliceBlue|antiqueWhite|aqua|aquamarine|azure|beige|bisque|black|blanchedAlmond|blue|blueViolet|brown|burly|wood|cadetBlue|chartreuse|chocolate|coral|cornflowerBlue|cornsilk|crimson|cyan|darkBlue|darkCyan
    |darkGoldenRod|darkGray|darkGrey|darkGreen|darkKhaki|darkMagenta|darkOliveGreen|darkOrange|darkOrchid|darkRed|darkSalmon|darkSeaGreen|darkSlateBlue|darkSlateGray|darkSlateGrey|darkTurquoise|darkViolet|deepPink|deepSkyBlue|dimGray|dimGrey|dodgerBlue|
    fireBrick|floralWhite|forestGreen|fuchsia|gainsboro|ghostWhite|gold|goldenRod|gray|grey|green|greenYellow|honeyDew|hotPink|indianRed|indigo|ivory|khaki|lavender|lavenderBlush|lawnGreen|lemonChiffon|lightBlue|lightCoral|lightCyan|lightGoldenRodYellow|lightGray
    |lightGrey|lightGreen|lightPink|lightSalmon|lightSeaGreen|lightSkyBlue|lightSlateGray|lightSlateGrey|lightSteelBlue|lightYellow|lime|limeGreen|linen|magenta|maroon|mediumAquaMarine|mediumBlue|mediumOrchid|mediumPurple|mediusmSeaGreen|mediumSlateBlue
    |mediumSpringGreen|mediumTurquoise|mediumVioletRed|midnightBlue|mintCream|mistyRose|moccasin|navajoWhite|navy|oldLace|olive|oliveDrab|orange|orangeRed|orchid|paleGoldenRod|paleGreen|paleTurquiose|paleVioletRed|papayaWhip|peachPuff|peru|pink|plum|powderBlue
    |purple|rebeccaPurple|red|rosyBrown|royalBlue|saddleBrown|salmon|sandyBrown|seaGreen|seaSheel|sienna|silver|skyBlue|slateGray|slateGrey|snow|springGreen|steel|blue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whiteSmoke|yellow|yellowGreen)(?!.)`)
}

const keyframesPropertyRegex = RegExp(`(^background|^background-color|^background-position|^background-size|^border|^border-color|^border-width|^border-bottom|^border-bottom-color|^border-bottom-left-radius|^border-bottom-right-radius|^border-bottom-width|^border-left|^border-left-color|
  ^border-left-width|^border-radius|^border-right|^border-right-color|^border-right-width|^border-spacing|^border-top|^border-top-color|^border-top-left-radius|^border-top-right-radius|^border-top-width|^bottom|^box-shadow|^caret-color|^clip|^color|^column-count
  |^column-gap|^column-rule|^column-rule-color|^column-rule-width|^column-width|^columns|^content|^filter|^flex|^flex-basis|^flex-grow|^flex-shrink|^font|^font-size|^font-size-adjust|^font-stretch|^font-weight|^grid-area|^grid-auto-columns|^grid-auto-flow|^grid-auto-rows
  |^grid-column-end|^grid-column-gap|^grid-column-start|^grid-column;|^grid-gap|^grid-row-end|^grid-row-gap|^grid-row-start|^grid-row|^grid-template-areas|^grid-template-columns|^grid-template-rows|^grid-template|^grid|^height|^left|^letter-spacing|^line-height|^margin|^margin-bottom
  |^margin-left|^margin-right|^margin-top|^max-height|^max-width|^min-height|^min-width|^opacity|^order|^outline|^outline-color|^outline-offset|^outline-width|^padding|^padding-bottom|^padding-left|^padding-right|^padding-top|^perspective|^perspective-origin|^quotes|^right|^tab-size|
  ^text-decoration|^text-decoration-color|^text-indent|^text-shadow|^top|^transform|^vertical-align|^visibility|^width|^word-spacing|^z-index)(?!.)`)

const otherKeyframesValues = RegExp('.')

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

const keyframeValueRegex= {
  'opacity': RegExp('^[0-1](\\.)[0-9]([0-9])?(?!.)'),
  'height': RegExp('^[1-9][0-9]{3}(px|%|em)(?!.)|^[1-9][0-9]{2}(px|%|em)(?!.)|^[1-9][0-9](px|%|em)(?!.)|^[0-9](px|%|em)(?!.)'),
  'display': RegExp('^none(?!.)|^block(?!.)|^inline(?!.)|^inline-block(?!.)'),
  'background-image': RegExp('.'),
  'background': RegExp('.'),
  'background-color': RegExp('.'),
  'background-position': RegExp('.'),
  'background-size': RegExp('.'),
  'border': RegExp('.'),
  'border-color': RegExp('.'),
  'border-width': RegExp('.'),
  'border-bottom': RegExp('.'),
  'border-bottom-color': RegExp('.'),
  'border-bottom-left-radius': RegExp('.'),
  'border-bottom-right-radius': RegExp('.'),
  'border-bottom-width': RegExp('.'),
  'border-left': RegExp('.'),
  'border-left-color': RegExp('.'),
  'border-left-width': RegExp('.'),
  'border-radius': RegExp('.'),
  'border-right': RegExp('.'),
  'border-right-color': RegExp('.'),
  'border-right-width': RegExp('.'),
  'border-spacing': RegExp('.'),
  'border-top': RegExp('.'),
  'border-top-color': RegExp('.'),
  'border-top-left-radius': RegExp('.'),
  'border-top-right-radius': RegExp('.'),
  'border-top-width': RegExp('.'),
  'bottom': RegExp('.'),
  'box-shadow': RegExp('.'),
  'caret-color': RegExp('.'),
  'clip': RegExp('.'),
  'color': RegExp('.'),
  'column-count': RegExp('.'),
  'column-gap': RegExp('.'),
  'column-rule': RegExp('.'),
  'column-rule-color': RegExp('.'),
  'column-rule-width': RegExp('.'),
  'column-width': RegExp('.'),
  'columns': RegExp('.'),
  'content': RegExp('.'),
  'filter': RegExp('.'),
  'flex': RegExp('.'),
  'flex-basis': RegExp('.'),
  'flex-grow': RegExp('.'),
  'flex-shrink': RegExp('.'),
  'font': RegExp('.'),
  'font-size': RegExp('.'),
  'font-size-adjust': RegExp('.'),
  'font-stretch': RegExp('.'),
  'font-weight': RegExp('.'),
  'grid-area': RegExp('.'),
  'grid-auto-columns': RegExp('.'),
  'grid-auto-flow': RegExp('.'),
  'grid-row-end': RegExp('.'),
  'grid-row-gap': RegExp('.'),
  'grid-row-start': RegExp('.'),
  'grid-row': RegExp('.'),
  'grid-template-areas': RegExp('.'),
  'grid-template-columns': RegExp('.'),
  'grid-template-rows': RegExp('.'),
  'grid-template': RegExp('.'),
  'grid': RegExp('.'),
  'left': RegExp('.'),
  'letter-spacing': RegExp('.'),
  'line-height': RegExp('.'),
  'margin': RegExp('.'),
  'margin-bottom': RegExp('.'),
  'margin-left': RegExp('.'),
  'margin-right': RegExp('.'),
  'margin-top': RegExp('.'),
  'max-height': RegExp('.'),
  'max-width': RegExp('.'),
  'min-height': RegExp('.'),
  'min-width': RegExp('.'),
  'order': RegExp('.'),
  'outline': RegExp('.'),
  'outline-color': RegExp('.'),
  'outline-offset': RegExp('.'),
  'outline-width': RegExp('.'),
  'padding': RegExp('.'),
  'padding-bottom': RegExp('.'),
  'padding-left': RegExp('.'),
  'padding-right': RegExp('.'),
  'padding-top': RegExp('.'),
  'perspective': RegExp('.'),
  'perspective-origin': RegExp('.'),
  'quotes': RegExp('.'),
  'right': RegExp('.'),
  'tab-size': RegExp('.'),
  'text-decoration': RegExp('.'),
  'text-decoration-color': RegExp('.'),
  'text-indent': RegExp('.'),
  'text-shadow': RegExp('.'),
  'top': RegExp('.'),
  'transform': RegExp('.'),
  'vertical-align': RegExp('.'),
  'visibility': RegExp('.'),
  'width': RegExp('.'),
  'word-spacing': RegExp('.'),
  'z-index': RegExp('.') 
}


export {animationPropRegex, keyframeStageRegex, keyframesPropertyRegex, otherKeyframesValues, transformRegex, colorRegex, keyframeValueRegex}