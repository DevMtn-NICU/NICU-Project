// EXPRESS CONFIGURATION FILE
// we require the config file first!
var config = require('./config.js'),
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');


module.exports = function () {
    // generates the app object
    var app = express();

    // this middleware will run no matter the environment
    app.use(cors()); // disable this if this server is not for api
    app.use(bodyParser.urlencoded(
        {
            extended: true
        }));
    app.use(bodyParser.json());
    //configs the passport object to use in future functions
    require('./passport.js')(passport);


    // cookie support
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // here we register flash and passport
    app.use(passport.initialize());
    app.use(passport.session());


    // HERE WE INCLUDE THE ROUTES
    // we run the router objects giving them the express app and passport
    require('../routes/index.server.routes.js')(app, passport);
    require('../routes/users.server.routes.js')(app, passport);
    require('../routes/baby.server.routes.js')(app, passport);
    require('../routes/babyNote.server.routes.js')(app, passport);

    // THIS WILL BE ANGULAR APP
    // here we set the static files folder
    // needs to come after setting the rendering engine
    // the route to link to static resources from our
    // website will start at 'assets'; see index.ejs
    app.use(express.static('./core/client'));

    return app;
};
