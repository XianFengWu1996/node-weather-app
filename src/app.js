const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Shawn Wu'
  })
})

app.get('/about', (req,res)=>{
  res.render('about', {
    title: 'About page',
    name: 'Shawn Wu'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    helpText: 'This is a help page',
    title: 'Help page',
    name: 'Shawn Wu'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if(!address){
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode(address, (error, {latitude, longitude,location} = { }) => {
    if(error){
      return res.send({ error })
    }
      forecast(latitude, longitude,  (error, forecastData) =>{
        if(error){
          return res.send({error})
        }
  
        res.send([{
          weather: forecastData,
          location,
          address
        }])

      })
    })

  
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404',
    name: 'Shawn Wu',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    title: '404',
    name: 'Shawn Wu',
    error: 'Page not found'
  })
})

const port = process.env.PORT || 3000

app.listen( port , () => {
  console.log('Server is up on port '+ port)
})