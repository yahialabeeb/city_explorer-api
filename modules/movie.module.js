
const axios = require('axios')





// create the function to get data from movie api server and send it for the clint 
function handleMovie(req, res) {
    let cityName1 = req.query.cityName
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName1}`
    let arrOfMovies = []
    axios.get(movieURL).then(result => {
        result.data.results.forEach((item) => {
            // there is no img url 
            arrOfMovies.push(new Movies(item.title, item.overview, item.vote_average, item.vote_count, item.popularity, item.release_date));
        })
        console.log(arrOfMovies);
    res.send(arrOfMovies);
    })



    



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

module.exports = handleMovie;