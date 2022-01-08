const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({

    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date
    },
    ImagePath: String,
    Actors: [String],
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let actorSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Bio: String,
    Birth: Date,
    Death: Date,
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Actor = mongoose.model('Actor', actorSchema)

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Actor = Actor;