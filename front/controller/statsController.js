angular.module('pliApp').controller('statsController', function($scope, $http, userFactory) {
    var userName = userFactory.getUsername();
    var data = $.param({'userId':userName.userId});
    var datas = null;
    $http({
                    url: "/api/google/about", method: 'POST',
                    data: data,
                    headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
                }).then(function(response) {
                    if(response.status === 200) {
                        datas = response.data.data;
                        console.log(response.data.data);
                        $scope.labels = ["Total Space", "Total Used Space", "Used Space in Drive", "Used Space in Drive Trash"];
                        $scope.data = [datas.storageQuota.limit, datas.storageQuota.usage, datas.storageQuota.usageInDrive, datas.storageQuota.usageInDriveTrash];
                        $scope.userName = datas.user.displayName;
                    }
                });
});

