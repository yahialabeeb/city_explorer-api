'use strict';

const express = require('express')
require('dotenv').config();
const cors = require('cors')
// const handleWeather = require('./data/weather.json')

const server = express();
const PORT = process.env.PORT
server.use(cors());


const handleMovie = require('./modules/movie.module.js')
const handleWeather = require('./modules/weather.module.js')






// LAB08 & lab09 
// weathers 

// `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=7`


server.get('/weather', handleWeather)


// moves
// `https://api.themoviedb.org/3/search/movie?api_key=${}&query=${cityName}`

server.get('/movie', handleMovie)


// notfound
server.get('*', (req, res) => {
    res.status(404).send('not found');
})

// sitting a port


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})


// lab07
// server.get('/weatherin', (req, res) => {
//     let cityName = req.query.cityName
//     let cityLat = req.query.lat
//     let cityLon = req.query.citylon
//     let labib = weatherData.find((val) => {
//         if (val.city_name.toLowerCase() === cityName.toLowerCase() ||
//             Math.floor(val.lat) === Math.floor(cityLat) ||
//             Math.floor(val.lon) === Math.floor(cityLon)
//         ) {

//             return val;

//         }
//     })
//     let arrForecast = []
//     if (labib === undefined) {
//         arrForecast.push("Sorry... there is no data")
//     }
//     else {
//         labib.data.forEach((value) => {
//             arrForecast.push(new Forecast(value.weather.description, value.datetime));
// //         })
// //     }




//     res.send(arrForecast);
// })
