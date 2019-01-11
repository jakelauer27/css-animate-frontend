export const addUser = async (user) => {
  try {
    const response = await fetch('https://css-animate.herokuapp.com/api/users/new', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data 
  } catch(error) {
    return new Error(error)
  }
}

export const addAnimation = async (user_id, ani_name, properties, keyframes) => {
  try {
    const response = await fetch(`https://css-animate.herokuapp.com/api/users/${user_id}/animations/new`, {
      method: 'POST',
      body: JSON.stringify({user_id, ani_name, properties, keyframes}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data 
  } catch(error) {
    return new Error(error)
  }
}

export const editAnimation = async (user_id, animation_id, animation) => {
  try {
    const response = await fetch(`https://css-animate.herokuapp.com/api/users/${user_id}/animations/${animation_id}`, {
      method: 'PUT',
      body: JSON.stringify({user_id, animation_id, ani_name: animation.properties.name, properties: animation.properties, keyframes: animation.keyframes}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = response.json()
    return data
  } catch(error) {
    return new Error(error)
  }
}