// Application Dependencies
const { Movie } = require('./lib/app/models/Movie');

const { MoviesDAO } = require('./lib/app/database/MoviesDAO.js')

const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 3000
const express = require('express');
const app = express();
const port = 5000;

// Database configuration
const dbHost = "localhost"
const dbPort = 3306;
const dbUsername = "root"
const dbPassword = "root"

app.use(bodyParser.json());

//cors
const cors = require('cors');
app.use(cors());

// POST (create) Route at '/movies' that adds a Movie to the database
app.post('/movies', function (req, res)
{
    console.log(req);
    
    // If invalid POST Body then return 400 response else add Movie to the database
    console.log('In POST /movies Route with Post of ' + JSON.stringify(req.body));
    if(!req.body.title)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Movie Posted"});
    }
    else
    {
        // Create a Movie object model from Posted Data
        let movie = new Movie(-1, req.body.title, req.body.genre, req.body.year_released, req.body.rating, req.body.image, req.body.video);

        // Call MovieDAO.create() to create a Movie from Posted Data and return an OK response     
        let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(movie, function(movieId)
        {
            if(movieId == -1)
                res.status(200).json({"error" : "Creating Movie failed"})
            else
                res.status(200).json({"success" : "Creating Movie passed with an Movie ID of " + movieId});
        });     
      }
})

// Route code begins
// GET Route at Root '/' that returns a Test Text message
app.get('/', function (_req, res)
{
    // Return Test Text
    console.log('In GET / Route');
    res.send('This is the default root Route.');
})
// GET Route at '/movies' that returns all Movies from the database
app.get('/movies', function (_req, res)
{
    // Return Movies List as JSON, call MoviesDAO.findAllMovies(), and return JSON array of Movies (a string)
    console.log('In GET /movies Route');
    let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findAllMovies(function(movies)
    {
        res.json(movies);
    });
})

//GET Route at '/titles' that returns all Movie titles from the database
app.get('/titles', function (_req, res)
{
    // Return Movie titles List as JSON, call MoviesDAO.findMoviesByTitle(), and return JSON array of Movies (a string)
    console.log('In GET /titles Route');
    let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.findMoviesByTitle(function(movies)
    {
        res.json(movies);
    });
})

//GET route returns a movie by Id
app.get('/movies/:id', function(req, res) 
{
    // Get the Movie
    console.log('In GET /movies Route with ID of ' + req.params.id);
    let movieId = Number(req.params.id);
 
    // Call MoviesDAO to get a Movie by Id from the database and return if passed
    let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);

    dao.findMovieById(movieId, function(movie)
    {
        res.json(movie);

        // if(changes == 0)
        //     res.status(200).json({"error" : "Get Movie failed"})
        // else
        //     res.status(200).json({"success" : "Get Movie passed"})
    });

})

// PUT (update) Route at '/movies' that updates a Movie in the database
app.put('/movies', function (req, res)
{
    // If invalid PUT Body then return 400 response else update Movie to the database
    console.log('In PUT /movies Route with Post of ' + JSON.stringify(req.body));
    if(!req.body.title)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid Movie Posted"});
    }
    else
    {
        // Create an Movie object model from Posted Data
        
        let movie = new Movie(req.body.id, req.body.title, req.body.genre, req.body.year_released, req.body.rating, req.body.image, req.body.video);

        // Call MovieDAO.update() to update a Movie from Posted Data and return an OK response     
        let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(movie, function(changes)
        {
            if(changes == 0)
                res.status(200).json({"error" : "Updating Movie passed but nothing was changed"})
            else
                res.status(200).json({"success" : "Updating Movie passed and data was changed"});
        });     
      }
})


//DELETE Route at '/movies/:id' that deletes the movie associated with the id 
app.delete('/movies/:id', function (req, res)
{
    // Get the Movie
    console.log('In DELETE /movies Route with ID of ' + req.params.id);
    let movieId = Number(req.params.id);
    
    // Call MoviesDAO.delete() to delete a Movie from the database and return if passed
    let dao = new MoviesDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(movieId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Movie failed"})
        else
            res.status(200).json({"success" : "Delete Movie passed"})
    });
 })


// Route code ends
// Start the Server
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
