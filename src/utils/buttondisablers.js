export const prebuiltButtonDisabler = (input) => {
  if(!input) {
    document.querySelector('.play-btn').setAttribute('disabled', true)
    document.querySelector('.save-as-btn').setAttribute('disabled', true)
  } else {
    document.querySelector('.play-btn').removeAttribute('disabled')
    document.querySelector('.save-as-btn').removeAttribute('disabled')
  }
}
export const buttonDisabler = (input) => {
  if(!input) {
    document.querySelector('.save-as-btn').setAttribute('disabled', true)
    document.querySelector('.save-btn').setAttribute('disabled', true)
    document.querySelector('.play-btn').setAttribute('disabled', true)
  } else {
    document.querySelector('.save-btn').removeAttribute('disabled')
    document.querySelector('.save-as-btn').removeAttribute('disabled')
    document.querySelector('.play-btn').removeAttribute('disabled')
  }
}