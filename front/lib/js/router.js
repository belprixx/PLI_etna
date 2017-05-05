// create the module and name it routeApp
var routeApp = angular.module('pliApp', ['ngRoute', 'LocalStorageModule', 'chart.js']);

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

    })
    .when("/logout", {
        templateUrl :'/view/logout.html',
        controller : 'logoutController'

    })
    .when("/stats", {
        templateUrl :'/view/stats.html',
        controller : 'statsController'

    })
    .when("/list", {
        templateUrl : '/view/list.html',
        controller : 'listController'
    })
    // route for the home page
    .otherwise({
        redirectTo: '/'
    });
}).run(['$rootScope', 'localStorageService', '$location', 'userFactory',
    function($rootScope, localStorageService, $location, userFactory) {
        $rootScope.$on('$routeChangeStart', function(event) {
            if ($location.url() == '/register' && !userFactory.isSignedIn()){
                    $location.path('/register')
            }
            else if ($location.url() == '/register' && userFactory.isSignedIn()){
                  event.preventDefault()
            }
            else if (!userFactory.isSignedIn()){
                $location.path('/login');
              }
            else if ($location.path() == '/login'){
                event.preventDefault();
            }
        });
    }
]);
