// Express and Morgan Requires
const express = require('express'),
    morgan = require('morgan');

const app = express()

// List of top movies
let topMovies = [
    {
        title: 'The Shawshank Redemption'
    },
    {
        title: 'Parasite'
    },
    {
        title: 'Fight Club'
    },
    {
        title: 'Good Will Hunting'
    },
    {
        title: 'A River Runs Through it'
    },
    {
        title: 'Titanic'
    },
    {
        title: 'Boyhood'
    },
    {
        title: 'City of God'
    },
    {
        title: 'Seven'
    },
    {
        title: 'Inception'
    }
];

// Use Express to return all static files in public folder
app.use(express.static('public'));

// Use morgan for logging
app.use(morgan('common'));

//Get Requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

//Get Movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

//Get documentation 
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname }); //respond through express.static
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("An error has been detected")
});

app.listen(8080, () => {
    console.log('This app is listening on port 8080.');
});
