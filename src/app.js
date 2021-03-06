const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aman'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    name: "Aman"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Aman'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a Address'
    })
  }
  geocode(address, (error, { latitude, longitude, placeName } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location: placeName,
        address: req.query.address
      })
    })
  })


})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404 help",
    name: 'Aman',
    errorMessage: "Help Article not Found"
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: 'Aman',
    errorMessage: "Page not Found"
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port);
})