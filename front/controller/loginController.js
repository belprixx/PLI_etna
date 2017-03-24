angular.module('pliApp').controller('loginController', function($scope, $location, $http, $window, userFactory) {
    $scope.submitForm = function(form) {
            if (form.$valid) {
                var data = $.param({
                mail: $scope.mail,
                password: $scope.password
            });
            $http({
                url: "/api/login", method: 'POST',
                data: data,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then(
                    function(response){
                        if (response.data === null) {
                            console.log("BAD MDP");
                        }
                        else {
                            console.log(response.data.User[0]);
                            var user = response.data.User[0];
                            var login = userFactory.setUsername(user.Firstname, user.Lastname, user.id).login();
                            $location.url('/');
                        }
                    }
            );
        };
    };
});
