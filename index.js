// Mongoose models
const mongoose = require('mongoose'),
    Models = require('./models.js'),
    { check, validationResult } = require('express-validator'),
    Movies = Models.Movie,
    Users = Models.User,
    Actors = Models.Actor;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Express and Morgan Requires
const express = require('express'),
    morgan = require('morgan');
app = express()

bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use Cors
const cors = require('cors');
let allowedOrigins = ['https://lynnflix.netlify.app/', 'http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'https://lynnflix.herokuapp.com/'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
            let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

// Use Auth.js
let auth = require('./auth')(app);

// Use Express to return all static files in public folder
app.use(express.static('public'));

// Use morgan for logging
app.use(morgan('common'));



//User Passport
const passport = require('passport');
require('./passport');

//Get Requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//Get ALL Movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => { res.status(201).json(movies) })
        .catch((err) => {
            console.error(err);
            res.status(500).sent('Error' + err)
        })
});


//Get ALL Actors
app.get('/actors', passport.authenticate('jwt', { session: false }), (req, res) => {
    Actors.find()
        .then((actors) => { res.status(201).json(actors) })
        .catch((err) => {
            console.error(err);
            res.status(500).sent('Error' + err)
        })
});

//Get data about an actor by actorname
app.get('/actors/:actor', passport.authenticate('jwt', { session: false }), (req, res) => {
    Actors.find({ Name: req.params.actor })
        .then((actor) => { res.status(201).json(actor) })
        .catch((err) => {
            console.error(err);
            res.status(500).sent('Error' + err)
        })
});




//Get movies by Title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get Genre Description
app.get("/genres/:genre", passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({
        "Genre.Name": req.params.genre,
    })
        .then((movie) => {
            res.json(movie.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});


//Get movies by Genre
app.get('/genres/:genre/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({
        'Genre.Name': req.params.genre
    })
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//Get movies by director
app.get('/directors/:director/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({
        'Director.Name': req.params.director
    })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


//Get Director Description
app.get("/directors/:director", passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({
        "director.Name": req.params.director,
    })
        .then((movie) => {
            res.json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});


//Get documentation 
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname }); //respond through express.static
});

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((users) => { res.status(201).json(users) })
        .catch((err) => {
            console.error(err);
            res.status(500).sent('Error' + err)
        })
});

/* Add a new user from JSON Object in body:
{
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ], (req, res) => {

        // check the validation object for errors
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set:
            {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }
        },
            { new: true }, // This line makes sure that the updated document is returned
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error: ' + err);
                } else {
                    res.json(updatedUser);
                }
            });
    });

//Add movie to user's favorite movie list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//Delete movie from user's favorite movie list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
        { new: true }, // This line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//Delete user by username / Allow user to de-register
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});



// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("An error has been detected")
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});