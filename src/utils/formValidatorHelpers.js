export const invalidInput = (target) => {
  target.classList.add('red')
  document.querySelector('.play-btn').setAttribute('disabled', true)
}

export const validInput = (target) => {
  target.classList.remove('red')
  document.querySelector('.play-btn').removeAttribute('disabled')
}
