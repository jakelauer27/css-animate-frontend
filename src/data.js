const animations = {
  'slideIn': {
    'properties': {
      'name': 'slideIn',
      'duration': '1.5s',
      'timing-function': 'ease',
      'delay': '0s',
      'iteration-count': '1',
      'direction': 'forwards',
      'fill-mode': 'forwards'
    },
    'keyframes': {
      'name': 'slideIn',
      'sections': [
        {
          'label': 'from',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(-100px)'
            }
          ]
        },
        {
          'label': 'to',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(0px)'
            }
          ]
        },
      ]
    }
  },
}

export default animations;