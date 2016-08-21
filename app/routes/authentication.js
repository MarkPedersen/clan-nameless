var User	= require('../models/user');
var jwt		= require('jsonwebtoken');
var config	= require('../../config');

var secret = config.secret;

module.exports = function(app, express)
{
	// get an instance of the express router
	var authenticationRouter = express.Router();

	


	// Route to authenticate a user
	authenticationRouter.post('/authenticate', function(req, res)
	{
		console.log(req.body.username);

		// Find the user
		// Select the name, username and password 
		User.findOne(
		{
			username: req.body.username
		}).select('_id name username role password').exec(function(err, user)
		{
			if(err) throw err;

			// If no user with that username was found
			if(!user)
			{
				res.json(
				{
					success: false,
					message: 'Authentication failed. User not found.'
				});
			}
			else if(user)
			{
				// Check if password matches
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword)
				{
					res.json(
					{
						success: false,
						message: 'Authentication failed. Wrong password'
					});
				}
				else
				{
					// If user is found and password is correct
					// create a token
					var token = jwt.sign({
					id: user._id,
					name: user.name,
					username: user.username,
					role: user.role
					}, config.secret, {
					expiresIn: 1140 // 24 hours
					});

					// return the information including token as JSOn
					res.json(
					{
						success: true,
						message: 'Have a token',
						token: token
					});
				}
			}
		})
	});

	// Middleware to use for all requests
	authenticationRouter.use(function(req, res, next)
	{
		// Check header or url parameters or post parameters for token
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// Decode token
		if(token)
		{
			jwt.verify(token, secret, function(err, decoded)
			{
				if(err)
				{
					return res.json(
					{
						success: false,
						message: 'Failed to authenticate token'
					});
				}
				else
				{
					// If everything is correct save the request
					req.decoded = decoded;
					next();
				}
			});
		}
		else
		{
			// If there is no token
			// Return an HTTP response of 403 (Access Forbidden) and a message
			return res.status(403).send(
			{
				success: false,
				message: 'No token provided'
			});
		}
	});

	authenticationRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return authenticationRouter;
}	