// create the module and name it routeApp
var routeApp = angular.module('pliApp', ['ngRoute']);

// configure our routes
routeApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : '/view/home.html',
        controller : 'homeController'
    })
    .when("/register", {
        templateUrl: '/view/register.html',
        controller : 'registerController'
    })
    .when("/login", {
        templateUrl :'/view/login.html',
        controller : 'loginController'

    });
});
