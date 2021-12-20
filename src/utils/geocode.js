const request = require('postman-request')

const geocode = (address, callback) => {
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1hbi02MiIsImEiOiJja3hhaGNjMDQzaTE1MnRwejVpaGN6cnkxIn0.klev9kj3txLNZei8Gd4KqA&limit=1'

 request({ url, json: true }, (error, { body }) => {
  if (error) {
   callback('Unable to connect to location services!', undefined)
  } else if (body.features.length === 0) {
   callback('Unable to find location, Try again with different search result', undefined)
  } else {
   const place = body.features[0].place_name
   const latitude = body.features[0].center[1]
   const longitude = body.features[0].center[0]
   // console.log(latitude, longitude);
   callback(undefined, { placeName: place, latitude, longitude })
  }
 })
}

module.exports = geocode

 // & limit=1