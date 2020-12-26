const request = require('axios')

const forecast = (longitude, latitude, callback) => {
  if (arguments.length != 5) {
    callback('Invalid number of arguments provided.')
  }

  const url = 'http://api.weatherstack.com/current?access_key=ce1f3cf3fc852a91fa735d5e14735402&units=f&query=' + latitude + ',' + longitude
  request.get(url)
    .then( (response) => {
      console.log(response.data.current)
      if (!response.data.current) {
        console.log(response.data)
        return callback('Location not found. Try another search.')
      }
      callback(undefined, `${response.data.current.weather_descriptions[0]}. Current temperature is ${response.data.current.temperature}. It feels like ${response.data.current.feelslike}. Humidity is ${response.data.current.humidity}%.`)
    })
    .catch( (e) => {
      callback(e)
    })
}

module.exports = forecast