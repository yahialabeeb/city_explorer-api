'use strict'
const axios = require('axios')

const Cache = require('../helpers/Cache.helper.js')

let cacher = new Cache();

// create the function to get data from movie api server and send it for the clint 
function handleMovie(req, res) {

    //search for city in cacher 

    let cityName = req.query.cityName
    if (cacher.datacached[cityName] === undefined) {
// if it is not in cacher 
        let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
        let arrOfMovies = []
        axios.get(movieURL).then(result => {
            result.data.results.forEach((item) => {
                // there is no img url 
                arrOfMovies.push(new Movies(item.title, item.overview, item.vote_average, item.vote_count, item.popularity, item.release_date));

                cacher.datacached[cityName] = arrOfMovies
                console.log("not cached");
            })
            res.send(cacher.datacached[cityName]);
        })
// if it is in cacher 
    } else {
        console.log("not cached");
        res.send(cacher.datacached[cityName]);
    }
}

// making a class to saving data from external api server as a object
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
//  after 1 day server wil reset the data 
const dayInMilSec = 86400000;
  const oneDayPassed = (Date.now() - cacher.timeStamp) > dayInMilSec;
  if (oneDayPassed) {
      console.log('Cache Reset');
     cacher = new Cache();
  }
module.exports = handleMovie;