
var myApp = angular.module('myApp', ['ngRoute'])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/task1', {templateUrl: 'task1/task1.html'});
		$routeProvider.when('/task2', {templateUrl: 'task2/task2.html'});
		$routeProvider.when('/task3', {templateUrl: 'task3/task3.html'});
		$routeProvider.otherwise({redirectTo: '/task1'});

		$locationProvider.html5Mode({enabled:true, requireBase: false});
	}])

	.controller('myAppController',['$scope', '$location', function ($scope, $location) {
		$scope.isActive = function(destination){
			return destination === $location.path();
		}
	}]);