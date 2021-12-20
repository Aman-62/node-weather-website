const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  msgTwo.textContent = ""
  const location = search.value
  console.log(location);
  if (!location) {
    msgOne.textContent = 'please enter location'
    return console.log('please enter location');
  }
  const url = '/weather?address=' + location
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return msgOne.textContent = data.error
      }
      msgOne.textContent = data.location
      msgTwo.textContent = data.forecast
      console.log(data);
    })
  })
})
