export const invalidInput = (target) => {
  target.classList.add('red')
  return false
}

export const validInput = (target) => {
  target.classList.remove('red')
  return true
}
