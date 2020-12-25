const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
  if (arguments.length != 5) {
    callback('Invalid number of arguments provided.')
  }

  const url = 'http://api.weatherstack.com/current?access_key=ce1f3cf3fc852a91fa735d5e14735402&units=f&query=' + latitude + ',' + longitude
  request({url, json: true},(error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service.")
    } else if (body.error) {
      callback(body.error.info)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. Current temperature is ${body.current.temperature}. It feels like ${body.current.feelslike}. Humidity is ${body.current.humidity}%.`)
    }
  })
}

module.exports = forecast