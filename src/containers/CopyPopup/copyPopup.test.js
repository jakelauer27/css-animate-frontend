import { CopyPopup, mapStateToProps } from './CopyPopup' 
import React from 'react'
import { shallow } from 'enzyme'

describe('CopyPopup', () => {
  let wrapper
  const mockAnimation = {
    'properties': {
      'name': 'bounceAppear',
      'duration': '450ms',
      'timingFunction': 'linear',
      'delay': '.7s',
      'iterationCount': 1,
      'direction': 'normal',
      'fill-mode': 'both'
    },
    'keyframes': {
      'name': 'bounceAppear',
      'sections': [
        {
          'name': '0%',
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
          'name': '50%',
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
          'name': '80%',
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
          'name': '100%',
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
  }

  beforeEach(() => {
    wrapper = shallow(<CopyPopup animation={mockAnimation} />)
  })


  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('copyPasteKeyframes', () => {

    beforeEach(() => {
      wrapper = shallow(<CopyPopup animation={mockAnimation} />, {disableLifecycleMethods: true})
    })
    
    it('should return some jsx', () => {
      expect(wrapper.instance().copyPasteKeyframes()).toMatchSnapshot()
    })

    it('should call getKeyframesStages', () => {
      const spy = jest.spyOn(wrapper.instance(), 'getKeyframeStages')
      wrapper.instance().copyPasteKeyframes()
      expect(spy).toHaveBeenCalled()
    })
  })


  describe('copyPasteAnimation', () => {
    
    it('should return some jsx', () => {
      wrapper = shallow(<CopyPopup animation={mockAnimation} />, {disableLifecycleMethods: true})
      expect(wrapper.instance().copyPasteAnimation()).toMatchSnapshot()
    })
  })

  describe('getKeyframesStages', () => {

    it('should return a stringified formatted keyframes object', () => {
      wrapper = shallow(<CopyPopup animation={mockAnimation} />, {disableLifecycleMethods: true})
      const expected = (  `0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  80% {
    opacity: 1;
    transform: scale(.89);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
  `)
      const result = wrapper.instance().getKeyframeStages(mockAnimation.keyframes)
      expect(result).toEqual(expected)
    })
  })

  describe('copySelection', () => {
    let mockEvent = {target:{previousElementSibling: {childNodes: [{select: jest.fn()}]}, name: 'copyKeyframes'}}
    document.execCommand = jest.fn()

    it('should call document.execCommand', () => {
      wrapper.instance().copySelection(mockEvent)
      expect(document.execCommand).toHaveBeenCalled()
    })

    it('should set state so that keyframes copy button is highlighted and text set to copied', () => {
      const expectedState = {
        copyKeyframes: true,
        copyProperties: false,
        copyKeyframesText: 'copied',
        copyPropertiesText: 'copy',
      }

      wrapper.instance().copySelection(mockEvent)

      expect(wrapper.state()).toEqual(expectedState)
    })

    it('should set state so that properties copy button is highlighted and text set to copied', () => {
      mockEvent = {target:{previousElementSibling: {childNodes: [{select: jest.fn()}]}, name: 'copyProperties'}}
      const expectedState = {
        copyKeyframes: false,
        copyProperties: true,
        copyKeyframesText: 'copy',
        copyPropertiesText: 'copied',
      }

      wrapper.instance().copySelection(mockEvent)

      expect(wrapper.state()).toEqual(expectedState)
    })
  })

  describe('mapStateToProps', () => {

    it('should return a props object with the animation', () => {
      const mockState = {animation: mockAnimation}
      const expected = {animation: mockAnimation}
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})