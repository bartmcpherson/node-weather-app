console.log('client side js file loaded')

const weatherForm = document.querySelector('form')
const searchString = document.querySelector('#searchString')
const locationDisplay = document.getElementById('locationDisplay')
const forecastDisplay = document.getElementById('forecastDisplay')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  locationDisplay.textContent = "Loading..."
  forecastDisplay.textContent = ""
  const location = searchString.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        locationDisplay.classList.add('error')
        locationDisplay.textContent = data.error
      } else {
        locationDisplay.classList.remove('error')
        locationDisplay.textContent = data.location
        forecastDisplay.textContent = data.forecast
      }
    })
  })
})