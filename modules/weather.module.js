
const axios = require('axios')

const Cache = require('../helpers/Cache.helper.js')
let cacher = new Cache();

//  create the function to get data from weather api server and send it for the clinet
function handleWeather(req, res) {

    const cityName = req.query.cityName
    const lat = req.query.lat
    const lon = req.query.citylon

    if (cacher.datacached[cityName] === undefined) {

    let weatherURL2 = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&lat=${lat}&lon=${lon}&&key=${process.env.WEATHER_API_KEY}&days=7`
    // 
    let arrForecast = []

    axios.get(weatherURL2).then(result => {

        result.data.data.forEach((value) => {
            arrForecast.push(new Forecast(value.weather.description, value.datetime));
        })
        cacher.datacached[cityName] = arrForecast

        res.send(cacher.datacached[cityName]);

    })
}
    else {
        res.send(cacher.datacached[cityName]);
    }

}

// making a class to saving data from external api server as a object
class Forecast {
    constructor(description, date) {
        this.description = description;
        this.date = date;
    }
}

//  after 1 day server wil reset the data 
const dayInMilSec = 86400000;
  const oneDayPassed = (Date.now() - cacher.timeStamp) > dayInMilSec;
  if (oneDayPassed) {
      console.log('Cache Reset');
     cacher = new Cache();
  }
module.exports = handleWeather;