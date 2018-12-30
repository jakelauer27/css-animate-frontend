import { CopyPopup, mapStateToProps } from './CopyPopup' 
import React from 'react'
import { shallow } from 'enzyme'

describe('CopyPopup', () => {
  let wrapper
  const mockAnimation = { 
    'properties': {
      'name': 'slideInX',
      'duration': '1.5s',
      'timingFunction': 'ease',
      'delay': '0s',
      'iterationCount': '1',
      'direction': 'normal',
      'fillMode': 'forwards'
    },
    'keyframes': {
      'name': 'slideInX',
      'sections': [
        {
          'name': '0%',
          'label': '0%',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(-300px)'
            }
          ]
        },
        {
          'name': '100%',
          'label': '100%',
          'properties': [
            {
              'name': 'transform',
              'value': 'translateX(0px)'
            }
          ]
        },
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
      const expected = (`0% {
    transform: translateX(-300px)
  }
  100% {
    transform: translateX(0px)
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