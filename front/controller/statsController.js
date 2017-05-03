angular.module('pliApp').controller('statsController', function($scope, $http, userFactory) {
    var userName = userFactory.getUsername();
    var data = $.param({'userId':userName.userId});

    $http({
        url: "/api/google/about", method: 'POST',
        data: data,
        headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
    }).then(function(response) {
        if(response.status === 200) {
            console.log(response);
        }
    });


    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
});
