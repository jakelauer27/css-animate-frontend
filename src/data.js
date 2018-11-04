const animationsData = {
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

  'dropDown': {
    'properties': {
      'name': 'dropDown',
      'duration': '.5s',
      'timing-function': 'ease',
      'delay': '0s',
      'iteration-count': '1',
      'direction': 'forwards',
      'fill-mode': 'forwards'
    },
    'keyframes': {
      'name': 'dropDown',
      'sections': [
        {
          'label': 'from',
          'properties': [
            {
              'name': 'height',
              'value': '0px'
            },
            {
              'name': 'display',
              'value': 'none'
            }
          ]
        },
        {
          'label': 'to',
          'properties': [
            {
              'name': 'height',
              'value': '100px'
            },
            {
              'name': 'display',
              'value': 'block'
            }
          ]
        },
      ]
    }
  },

  'ySpin': {
    'properties': {
      'name': 'ySpin',
      'duration': '2.6s',
      'timing-function': 'linear',
      'delay': '0s',
      'iteration-count': 'infinite',
      'direction': 'forwards',
      'fill-mode': 'forwards'
    },
    'keyframes': {
      'name': 'ySpin',
      'sections': [
        {
          'label': 'from',
          'properties': [
            {
              'name': 'transform',
              'value': 'rotateX(0deg)'
            },
          ]
        },
        {
          'label': 'to',
          'properties': [
            {
              'name': 'transform',
              'value': 'rotateY(360deg)'
            },
          ]
        },
      ]
    }
  },

  'bounceIn': {
    'properties': {
      'name': 'bounceIn',
      'duration': '450ms',
      'timing-function': 'linear',
      'delay': '.7s',
      'iteration-count': 1,
      'direction': 'forwards',
      'fill-mode': 'both'
    },
    'keyframes': {
      'name': 'bounceIn',
      'sections': [
        {
          'label': '0%',
          'properties': [
            {
              'name': 'opacity',
              'value': '0'
            },
            {
              'name': 'transform',
              'value': 'scale(0.3)'
            },
          ]
        },
        {
          'label': '50%',
          'properties': [
            {
              'name': 'opacity',
              'value': '0.9'
            },
            {
              'name': 'transform',
              'value': 'scale(1.1)'
            },
          ]
        },
        {
          'label': '80%',
          'properties': [
            {
              'name': 'opacity',
              'value': '1'
            },
            {
              'name': 'transform',
              'value': 'scale(.89)'
            },
          ]
        },
        {
          'label': '100%',
          'properties': [
            {
              'name': 'opacity',
              'value': '1'
            },
            {
              'name': 'transform',
              'value': 'scale(1)'
            },
          ]
        }
      ]
    }
  },
}

export default animationsData;