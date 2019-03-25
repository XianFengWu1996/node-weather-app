const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/c9498f21d0316dcc5d319d6bb8aa7f52/${lat},${long}`

  request({url, json:true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to location service!', undefined)
    } else if(body.error){
      callback('Unable to find location!', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain. The highest temperature is ${body.daily.data[0].temperatureMax} and the lowest temperature is ${body.daily.data[0].temperatureMin}`)
    }
  })
}

module.exports = forecast;