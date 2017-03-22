angular.module('pliApp').controller('homeController', function($scope, $location, $http, $window, userFactory) {

    var userName = userFactory.getUsername();
    $scope.fistName = userName.firstName;
    $scope.lastName = userName.lastName;

    var wtop;
	$scope.myFunc = function() {
        console.log("clik");
        $http({method: 'POST', url: '/api/test'}).
		  then(function(response) {
            console.log(response);
		  	if(response.status === 200) {
		  		console.log(response.status);
               wtop = $window.open(response.data, "toto", "width:500px,height:700px");
		  	} else
		  	      {
		  			 console.log("Error");
		  		  }
		  });

          window.onmessage = function(e){
            wtop.close();
            var url = e.data;
            console.log(wtop);
          }
    };
});
