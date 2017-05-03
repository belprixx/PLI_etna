angular.module('pliApp').controller('logoutController', function($scope, $location, userFactory) {
    userFactory.logout();
    $location.path('/');
});
