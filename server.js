'use strict';

const express = require('express')
require('dotenv').config();
const cors = require('cors')
const weatherData = require('./data/weather.json')

const server = express();
const PORT = process.env.PORT
server.use(cors());


class Forecast {
    constructor(description, date) {
        this.description= description;
        this.date = date;
    }
}

server.get('/weather', (req, res) => {
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
    labib = (labib === undefined) ? 'no data avilabile ' : labib
    let arrForecast = []
    labib.data.forEach((value)=>{
        arrForecast.push(new Forecast (value.weather.description,value.datetime));
    })
     
    
    
    res.send(arrForecast);
})

// server.get('/getDataFromPoke',(req,res)=>{
//    
//     console.log(req.query);
//     let pokemonName = req.query.pokeName;
//     let pokeInfo = pokeData.results.find(pokemon=>{
//         if(pokemon.name.toLowerCase()===pokemonName) {
//             return pokemon;
//         }
//     })
//     res.send(pokeInfo);
// })


server.get('*', (req, res) => {
    res.status(404).send('not found')
})


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})