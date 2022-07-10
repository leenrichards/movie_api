const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;


/* HTTP Authemtication for login requests */
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {

    Users.findOne({ Username: username }, (error, user) => {
        if (error) {
            console.error(error);
            return callback(error);
        }

        if (!user) {
            console.error('incorrect username');
            return callback(null, false, { message: 'Incorrect username or password.' });
        }

        if (!user.validatePassword(password)) {
            console.error('incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
        }

        return callback(null, user);
    });
}));

/* Authenticate users based on JWT*/
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));










