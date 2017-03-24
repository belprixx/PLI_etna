angular.module('pliApp').controller('homeController', function($scope, $location, $http, $window, userFactory) {

    var userName = userFactory.getUsername();
    $scope.fistName = userName.firstName;
    $scope.lastName = userName.lastName;

    var wtop;
	  $scope.myFunc = function() {
        console.log("clik");
        $http({method: 'POST', url: '/api/google/url'}).then(function(response) {
            console.log(response);
		  	  if(response.status === 200) {
		  		  console.log(response.status);
            wtop = $window.open(response.data, "Cliquer ici!!", "width:500px,height:700px");
		  	  }else{
		  		  console.log("Error");
		  	  }
		    });

        window.onmessage = function(e){
          wtop.close();
          var url = e.data;
          console.log(wtop);

          if(wtop){
            wtop.close();
          }
        var url = e.data;        
        var idx = urlWithCode.lastIndexOf("code=");
        var code = urlWithCode.substring(idx + 5).replace("#","");
        var url = "/api/google/oauth2callback?code=" + code;
        //ouverture de la deuxième page google !!! ajouter dans console developper
        $http.get(url).then(function(response) { console.log("token ok..");  });

        $http.get("https://www.googleapis.com/drive/v2/files/").then(function(response){
          console.log(response);
        });


        }
    };
});
