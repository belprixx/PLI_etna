angular.module('pliApp').controller('registerController', function($scope, $location, $http, $window) {
    $scope.submitForm = function(form) {
            if (form.$valid) {
                var data = $.param({
                mail: $scope.mail,
                password: $scope.password,
                roles: "user",
                firstName: $scope.firstname,
                lastName: $scope.lastname,
            });
            $http({
                url: "/api/register", method: 'POST',
                data: data,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(
                    function(response){
                        if (response.data === null) {
                        }
                        else {
                            $location.url('/');
                        }
                    }
            );
        };
    };
});
