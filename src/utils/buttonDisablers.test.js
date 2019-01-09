import { prebuiltButtonDisabler, buttonDisabler } from './buttondisablers'

describe('button disablers', () => {

  beforeEach(() => {
    document.querySelector = jest.fn().mockImplementation(() => ({
      setAttribute: jest.fn(),
      removeAttribute: jest.fn()
    }))
  })

  describe('prebuiltButtonDisabler', () => {

    it('should disable the play and saveas buttons', () => {
      prebuiltButtonDisabler(false)

      expect(document.querySelector).toHaveBeenCalledWith('.play-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-as-btn')
    })

    it('should enable the play and saveas buttons', () => {
      prebuiltButtonDisabler(true)

      expect(document.querySelector).toHaveBeenCalledWith('.play-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-as-btn')
    })
  })

  describe('buttonDisabler', () => {

    it('should disable the play, save, and saveas buttons', () => {
      buttonDisabler(false)

      expect(document.querySelector).toHaveBeenCalledWith('.play-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-as-btn')
    })

    it('should enable the play, save, and saveas buttons', () => {
      buttonDisabler(true)

      expect(document.querySelector).toHaveBeenCalledWith('.play-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-btn')
      expect(document.querySelector).toHaveBeenCalledWith('.save-as-btn')
    })
  })
})