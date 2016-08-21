angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider)
{
	$routeProvider

	// Route for the homepage
	.when('/', 
	{
		templateUrl : 'app/shared/homepage.html'
	})



	// login page
		.when('/login', {
			templateUrl : 'app/shared/login.html',
				controller : 'mainController',
				controllerAs: 'login'
		})



		//Show all users
		.when('/users', {
			templateUrl : 'app/components/user/views/all.html',
				controller : 'userController',
				controllerAs : 'user'
		})

		// form to create a new user
		// same view as EDIT PAGE
		.when('/users/create', {
			templateUrl : 'app/components/user/views/single.html',
				controller : 'userCreateController',
				controllerAs : 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl : 'app/components/user/views/single.html',
				controller : 'userEditController',
				controllerAs : 'user'
		})


		//events
	.when('/events', {
			templateUrl : 'app/components/event/views/all.html',
				controller : 'eventController',
				controllerAs : 'tevent'
		})

	.when('/events/create', {
			templateUrl : 'app/components/event/views/single.html',
				controller : 'eventCreateController',
				controllerAs : 'event'
		})

	.when('/events/:event_id', {
			templateUrl : 'app/components/event/views/single.html',
				controller : 'eventEditController',
				controllerAs : 'event'
		})


	.when('/rules', {
		templateUrl : 'app/shared/rules.html'
	})
	.when('/Communication', {
		templateUrl : 'app/shared/Communication.html'
	})

	// get rid of the hash in the url
	$locationProvider.html5Mode(true);
});