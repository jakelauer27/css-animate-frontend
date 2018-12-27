import { loadAnimation } from './actions'

describe('actions', () => {

  describe('loadAnimation', () => [

    it('should return a type of LOAD_ANIMATION with an animation', () => {
      const mockAnimation = {name: 'test', keyframes: {}, properties: {}}
      const expected = {type: 'LOAD_ANIMATION', animation: mockAnimation}
      expect(loadAnimation(mockAnimation)).toEqual(expected) 
    })
  ])
})