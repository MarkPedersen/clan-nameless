var User = require('../models/user');

module.exports = function(app, express)
{

	var userRouter = express.Router();


	
	// On routes that end in /users
	//-------------------------------------------------------
	userRouter.route('/users')
		//create a user
		.post(function(req, res)
		{
			var user 		= new User();
			user.name 		= req.body.name;
			user.username 	= req.body.username;
			user.password	= req.body.password;
			user.role		= req.body.role;

			user.save(function(err)
			{
				if(err) res.send(err);
				res.json({ message: 'User created!'});
			});
		})
		.get(function(req, res)
		{
			User.find(function(err, users)
			{
				if(err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	// On routes that end in /users/user_id
	//-------------------------------------------------------
	userRouter.route('/users/:user_id')
		// find the user on the specified userId
		.get(function(req, res)
		{
			User.findById(req.params.user_id, function(err, user)
			{
				if(err) res.send(err);

				// return the user
				res.json(user);
			});
		})
		// update the user on the specified userId
		.put(function(req, res)
		{
			User.findById(req.params.user_id, function(err, user)
			{
				if(err) res.send(err);

				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;
				if(req.body.role) user.role = req.body.role;

				// save the user
				user.save(function(err)
				{
					if(err) res.send(err);

					//return a message
					res.json({ message: 'The user has been updated'});
				});
			});
		})
		.delete(function(req, res)
		{
			User.remove(
			{
				_id : req.params.user_id
			},
			function(err, user)
			{
				if(err) return res.send(err);
				res.json({ message: 'the user has been deleted'});
			});
		});


		return userRouter;
}