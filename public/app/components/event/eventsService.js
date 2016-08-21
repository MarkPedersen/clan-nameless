angular.module('eventsService', [])


	.factory('Event', function($http) {

		var efactory = {};

		//get a single event
		efactory.get = function(eventid){
			return $http.get('/api/events/' + eventid);
		};

		//gets all events
		efactory.all = function() {
			return $http.get('/api/events');
		};


		efactory.create = function(eventData) {
			return $http.post('/api/events', eventData);
		};


		efactory.update = function(id, eventData) {
			return $http.put('/api/events/' + id, eventData);
		};


		efactory.delete = function(id) {
			return $http.delete('/api/events/' + id);
		};

		
		efactory.deleteEvent = function(eventid){
			return $http.delete('/api/events/' + eventid);
		};

		return efactory;
	});