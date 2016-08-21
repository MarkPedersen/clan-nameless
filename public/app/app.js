angular.module('Nameless', [
	'app.routes',
	'eventsController',
	'eventsService',
	'mainCtrl',
	'userService',
	'authService',
	'userCtrl',
])




.config(function($httpProvider) {

		// attach our auth interceptor to the http requests
		$httpProvider.interceptors.push('AuthInterceptor');
	});