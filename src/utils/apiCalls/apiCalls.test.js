import * as API from './apiCalls'

describe('API calls', () => {

  describe('addUser', () =>{
    let mockUser

    beforeEach(() => {
      mockUser = { id: 1, name: 'Taylor', password: 'password', email: 't@gmail.com'}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: 'Success'
        })
      }))
    })

    it('should call fetch with the correct params', async () => {
      const expectedUrl = 'http://localhost:3000/api/users/new'
      const expectObject = {      
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
        'Content-Type': 'application/json'
      }}

      await API.addUser(mockUser)
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectObject)
    })

    it('should return the success message', async () => {
      const result = await API.addUser(mockUser)
      expect(result).toEqual({data: 'Success'})
    })
    
    it('should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const result = await API.addUser(mockUser)
      expect(result).toEqual(Error('Error'))
    })
  })

  describe('addAnimation', () =>{
    let mockUser_id
    let mockAni_name
    let mockProperties
    let mockKeyframes
    
    beforeEach(() => {
      mockUser_id = 1
      mockAni_name = 'slideIn'
      mockProperties = {name: 'properties'}
      mockKeyframes = {name: 'keyframes'}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: 'Success'
        })
      }))
    })

    it('should call fetch with the correct params', async () => {
      const expectedUrl = 'http://localhost:3000/api/users/1/animations/new'
      const expectObject = {      
        method: 'POST',
        body: JSON.stringify({user_id: mockUser_id, ani_name: mockAni_name, properties: mockProperties, keyframes: mockKeyframes}),
        headers: {
        'Content-Type': 'application/json'
      }}

      await API.addAnimation(mockUser_id, mockAni_name, mockProperties, mockKeyframes)
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectObject)
    })

    it('should return the success message', async () => {
      const result = await API.addAnimation(mockUser_id, mockAni_name, mockProperties, mockKeyframes)

      expect(result).toEqual({data: 'Success'})
    })
    
    it('should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const result = await API.addAnimation(mockUser_id, mockAni_name, mockProperties, mockKeyframes)

      expect(result).toEqual(Error('Error'))
    })
  })

  describe('EditAnimation', () =>{
    let mockUser_id
    let mockAnimation_id
    let mockAnimation
    
    beforeEach(() => {
      mockUser_id = 1
      mockAnimation_id = 3
      mockAnimation = {properties: {name: 'slideIn'}, keyframes: {name: 'keyframes'}}
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: 'Success'
        })
      }))
    })

    it('should call fetch with the correct params', async () => {
      const expectedUrl = 'http://localhost:3000/api/users/1/animations/3'
      const expectObject = {      
        method: 'PUT',
        body: JSON.stringify({
          user_id: mockUser_id, 
          animation_id: mockAnimation_id, 
          ani_name: mockAnimation.properties.name, 
          properties: mockAnimation.properties, 
          keyframes: mockAnimation.keyframes}),
        headers: {
        'Content-Type': 'application/json'
      }}

      await API.editAnimation(mockUser_id, mockAnimation_id, mockAnimation)
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectObject)
    })

    it('should return the success message', async () => {
      const result = await API.editAnimation(mockUser_id, mockAnimation_id, mockAnimation)
      expect(result).toEqual({data: 'Success'})
    })
    
    it('should return an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const result = await API.editAnimation(mockUser_id, mockAnimation_id, mockAnimation)

      expect(result).toEqual(Error('Error'))
    })
  })
})