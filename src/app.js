const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Setup Express config paths and HandleBars
app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bart'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App - About',
    name: 'Bart'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Bart',
    errorMessage: 'This is a help topic page.'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address provided.'
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if(error) {
      return res.send({error})
    }
  
    forecast(longitude, latitude, (forecastError, forecastData) => {
      if(forecastError) {
        return res.send({forecastError})
      }
      
      res.send({
        address: req.query.address,
        location: location,
        forecast: forecastData
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorMessage: 'Help article not found.',
    name: 'Bart'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Bart'
  })
})

app.listen(port, () => {
  console.log('Server started on port ' + port + '.')
})