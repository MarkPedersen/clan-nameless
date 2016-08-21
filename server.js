// Require config file
var config = require('./config');

// LOAD THE PACKAGES
var express 		= require('express');
var app		 		= express();
var bodyParser		= require('body-parser');
var morgan 			= require('morgan');
var mongoose 		= require('mongoose');
var path 			= require('path');

// Digest request body information
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the database
mongoose.connect(config.database);

// Handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
	next();
})

app.use(morgan('dev'));

// static files location
 app.use(express.static(__dirname + '/public'));


// ROUTES
//------------------------------------
// AUTHENTICATION ROUTE
var authenticationRoutes = require('./app/routes/authentication')(app, express);
app.use('/api', authenticationRoutes);


// USER ROUTES
var userRoutes = require('./app/routes/user')(app, express);
app.use('/api', userRoutes);

// EVENT ROUTES
var eventRoutes = require('./app/routes/event')(app, express);
app.use('/api', eventRoutes);

var meRouter = express.Router();


// MAIN CATCHCALL ROUTE ---------
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(config.port);
console.log('Server started at port ' + config.port);