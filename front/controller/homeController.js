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
            console.log("response :" + response);            
          }
        });
    };    
});
