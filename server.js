'use strict';

const express = require('express')
require('dotenv').config();
const cors = require('cors')
const weatherData = require('./data/weather.json')
const axios = require('axios')

const server = express();
const PORT = process.env.PORT
server.use(cors());


class Forecast {
    constructor(description, date) {
        this.description = description;
        this.date = date;
    }
}
class Movies {
    constructor(title, overview, average_votes, total_votes, popularity, released_on) {
        this.released_on = released_on;
        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
    
        this.popularity = popularity;
    }
}



server.get('/weatherin', (req, res) => {
    let cityName = req.query.cityName
    let cityLat = req.query.lat
    let cityLon = req.query.citylon
    let labib = weatherData.find((val) => {
        if (val.city_name.toLowerCase() === cityName.toLowerCase() ||
            Math.floor(val.lat) === Math.floor(cityLat) ||
            Math.floor(val.lon) === Math.floor(cityLon)
        ) {

            return val;

        }
    })
    let arrForecast = []
    if (labib === undefined) {
        arrForecast.push("Sorry... there is no data")
    }
    else {
        labib.data.forEach((value) => {
            arrForecast.push(new Forecast(value.weather.description, value.datetime));
        })
    }




    res.send(arrForecast);
})


// LAB08 
// weathers 

// `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&lat=${cityLat}&lon=${cityLon}&key=${process.env.WEATHER_API_KEY}&days=7`


server.get('/weather', async (req, res) => {
    let cityName = req.query.cityName
    let cityLat = req.query.lat
    let cityLon = req.query.citylon
    let weatherURL2 = `https://api.weatherbit.io/v2.0/forecast/daily?city=amman&&key=${process.env.WEATHER_API_KEY}&days=7`
    let weatherData2 = (await axios.get(weatherURL2)).data.data
    console.log(weatherData2);
    let arrForecast = []

    weatherData2.forEach((value) => {
        arrForecast.push(new Forecast(value.weather.description, value.datetime));
    })

    res.send(arrForecast);

})




// moves
// `https://api.themoviedb.org/3/search/movie?api_key=${}&query=${cityName}`

server.get('/movie', async (req, res) => {
    let cityName = req.query.query
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=england`
    let movieData2 = (await axios.get(movieURL)).data.results
    // console.log(movieData2);
    let arrOfMovies = []
// there is no img url 
    movieData2.forEach((item) => {
        arrOfMovies.push(new Movies(item.title, item.overview, item.vote_average, item.vote_count, item.popularity, item.release_date));
    })

    res.send(arrOfMovies);

})

server.get('*', (req, res) => {
    res.status(404).send('not found')
})


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})