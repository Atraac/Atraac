
var registerController = angular.module('registerController', ['userFactory']);

registerController.controller('RegisterController', ['$scope', 'User', '$http',
    function ($scope, User, $http) {
        $scope.something = 'RegisterController';
        $scope.user = {};
        $scope.correctRegister = false;
        $scope.duplicateEmail = false;
        $scope.onRegister = function () {
            console.log($scope.user);
            /*var res = $http.post('http://192.168.0.101:8080/users', $scope.user);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });*/

            var req = {
                method: 'POST',
                url: 'http://192.168.0.101:8080/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: $scope.user
            };


            $http(req)
                .then(function (response)
                {
                    console.log(response);
                }, function (error) {
                    console.log("logError: " + error);
                });

            $scope.correctRegister = true;
        }
    }
]);