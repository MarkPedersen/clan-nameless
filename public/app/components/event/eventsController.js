angular.module('eventsController', ['eventsService'])
	

	.controller('eventController', function(Event){
		var vm = this;

		Event.all()
			.success(function(data) {

				vm.events = data;
			});

	// delete a event
	vm.deleteEvent = function(id) {
		//vm.processing = true;
			Event.delete(id)
				.success(function(data) {
					Event.all()
					.success(function(data) {
					//vm.processing = false;
					vm.events = data;
				});
			});
		};
	})

	.controller('eventCreateController', function(Event) {
		var vm = this;

		// variable to show/hide elements of the view
		// differentiates between create or edit pages
		vm.type = "create";

		// function to create a user
		vm.saveEvent = function() {
			//vm.processing = true;

			// clear the message
			vm.message = '';

			// use the create function in the userService
			Event.create(vm.eventData)
				.success(function(data) {
					//vm.processing = false;

					// clear the form
					vm.eventData = {};
					vm.message = data.message;
				});
		};
	})

	.controller('eventEditController', function($routeParams, Event) {
		var vm = this;

		//variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';

		// get the user data for user
		// $routeParams is the way we grab data from the URL
		Event.get($routeParams.event_id)
			.success(function(data) {
				vm.eventData = data;
				console.log(data);
			});


			// function to save the user
			vm.saveEvent = function() {
				//vm.processing = true;
				vm.message = '';
				
				// call the userService function to update
				Event.update($routeParams.event_id, vm.eventData)
					.success(function(data) {
						//vm.processing = false;
						
						// clear the form
						vm.eventData = {};

						// bind the message from our API
						vm.message = data.message;
					});
			};
	})
