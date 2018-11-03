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
              'value': 'translateX(-300px)'
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

  'rotateIn': {
    'properties': {
      'name': 'rotateIn',
      'duration': '1.8s',
      'timing-function': 'ease',
      'delay': '.5s',
      'iteration-count': '1',
      'direction': 'forwards',
      'fill-mode': 'forwards'
    },
    'keyframes': {
      'name': 'rotateIn',
      'sections': [
        {
          'label': 'from',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(400px) rotate(900deg)'
            }
          ]
        },
        {
          'label': 'to',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(0px) rotate(0deg)'
            }
          ]
        },
      ]
    }
  },

}

export default animations;