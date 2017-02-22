// create the module and name it routeApp
var routeApp = angular.module('pliApp', ['ngRoute','LocalStorageModule', 'ui.bootstrap']);

// configure our routes
routeApp.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
          templateUrl : '/view/home.html',
          controller : 'homeController'
        })
    }
