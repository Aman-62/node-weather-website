const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
 const url = "http://api.weatherstack.com/current?access_key=f6ce6bce7561d3ecdf1ac7e048eea50c&query=" + latitude + "," + longitude
 request({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect to weather service!', undefined)
  } else if (body.error) {
   callback('Unable to find location', undefined)
  } else {
   const weather = body.current.weather_descriptions[0]
   const degress = body.current.temperature
   const feelslike = body.current.feelslike
   const precip = body.current.precip
   const humidity = body.current.humidity
   callback(undefined, weather + ". It is currently " + degress + " degress out. There is a " + precip + "% chance of rain out. Humidity level is " + humidity)
  }
 })
}

module.exports = forecast