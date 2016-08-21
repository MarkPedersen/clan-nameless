// require the vent model
var Event = require('../models/event');
var User = require('../models/user');


module.exports = function(app, express)
{
	var eventRouter = express.Router();


	// On routes that end in /events
	//-------------------------------------------------------
	eventRouter.route('/events')
		// create an event
		.post(function(req, res)
		{
			var pEvent			= new Event();
			pEvent.name			= req.body.name;
			pEvent.game	 		= req.body.game;
			pEvent.description 	= req.body.description;
			pEvent.date 	= req.body.date;


			pEvent.save(function(err)
			{
				if(err) res.send(err);
				res.json({ message: 'Event Created!'});
			});
		})
		.get(function(req, res)
		{
			Event.find(function(err, events)
			{
				if(err) res.send(err);

				// return the events
				res.json(events);
			});
		});


		//returning all events for a user
	eventRouter.route('/events/myevents/:user_id')
		.get(function(req, res) {
			MyEvent.find({'user_id' : req.params.user_id}, function(err, events) {
				if (err) res.send(err);

				res.json(events);
			});
		});

		// ON routes that end in /event/event_id
		//-----------------------------------------------------
		eventRouter.route('/events/:event_id')
		// find the eventon the specified eventId
		.get(function(req, res)
		{
			Event.findById(req.params.event_id, function(err, event)
			{
				if(err) res.send(err);

				// return the event
				res.json(event);
			});
		})
		// update the event on the specified eventId
		.put(function(req, res)
		{
			Event.findById(req.params.event_id, function(err, pEvent)
			{
				if(err) res.send(err);

				if(req.body.name) pEvent.name = req.body.name;
				if(req.body.game) pEvent.game = req.body.game;
				if(req.body.description) pEvent.description = req.body.description;
				if(req.body.date) pEvent.date = req.body.date;


				// save the event
				pEvent.save(function(err)
				{
					if(err) res.send(err);

					//return a message
					res.json({ message: 'The event has been updated'});
				});
			});
		})
		.delete(function(req, res)
		{
			Event.remove(
			{
				_id : req.params.event_id
			},
			function(err, pEvent)
			{
				if(err) return res.send(err);
				res.json({ message: 'the event has been deleted'});
			});
		});

		return eventRouter;

}