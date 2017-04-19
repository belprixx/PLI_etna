angular.module('pliApp').controller('homeController', function($scope, $location, $http, $window, userFactory) {

    var userName = userFactory.getUsername();
    $scope.fistName = userName.firstName;
    $scope.lastName = userName.lastName;
    var data = $.param({'userId':userName.userId});
    var wtop;
    tabCloud = [];
    googleCloud = [];
    var isConnect = false;
    
    //appel /api/cloud/list - verification des listes de cloud connectés (post)
    $http({
        url: "/api/cloud/list", method: 'POST',
        data: data,
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      }).then(function(response) {
        if(response.status === 200) {
          isConnect = true;
          if (response.data.Cloud.length > 0){
            tabCloud = response.data.Cloud;
          }
        }
    });

	  $scope.myFunc = function() {
      FindGoogle = false;
      for(var i = 0; i < tabCloud.length; i++){
        if (tabCloud[i].id_cloud === 1){
          FindGoogle = true;
        }
      }

      if(FindGoogle == false)
        {
          $http({
                  url: "/api/google/url", method: 'POST',
                  data: $.param({ 'userId':userName.userId, 'idCloud' : 1 }),
                  headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
              }).then(function(response) {
                if(response.status === 200) {
                  console.log(response.status);
                }
              });
       }

     console.log("Liste files google");
     $http({
          url: "/api/google/list", method: 'POST',
          data: data,
          headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(response) {
          if(response.status === 200) {
            console.log("retour response api/google/list");
          }
        });

      //   $http({method: 'POST', url: '/api/google/url', data:data}).then(function(response) {
      //       console.log(response);
		  	 //  if(response.status === 200) {
		  		//   console.log(response.status);
      //       wtop = $window.open(response.data, "Cliquer ici!!", "width:500px,height:700px");
		  	 //  }else{
		  		//   console.log("Error");
		  	 //  }
		    // });

        // window.onmessage = function(e){
        //   wtop.close();
        //   var url = e.data;
        //   console.log(wtop);

        //   if(wtop){
        //     wtop.close();
        //   }
        //   var url = e.data;        
        //   var idx = urlWithCode.lastIndexOf("code=");
        //   var code = urlWithCode.substring(idx + 5).replace("#","");
        //   var url = "/api/google/oauth2callback?code=" + code;
        //   //ouverture de la deuxième page google !!! ajouter dans console developper
        //   $http.get(url).then(function(response) { console.log("token ok..");  });

        //   $http.get("https://www.googleapis.com/drive/v2/files/").then(function(response){
        //     console.log(response);
        //   });
        // }
    };

    
});
