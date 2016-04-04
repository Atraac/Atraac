var loginController = angular.module('loginController', []);

loginController.controller('LoginController', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {
        $scope.something = 'LoginController';
        $scope.user = {};

        $scope.submitLogin = function () {
            if ($scope.loginForm.$valid) {
                $scope.wrongUser = false;

                var req = {
                    method: 'POST',
                    url: 'http://192.168.0.101:8080/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: "username="+$scope.user.email+"&"+"password="+$scope.user.password
                };
                $http(req)
                    .then(function (response)
                    {
                        console.log(response);
                        console.log("dupa");
                    }, function (error) {
                        console.log(error);
                    });


                $scope.wrongUser = false;
                $scope.loginForm.email.$touched = false;
                $scope.loginForm.password.$touched = false;
                /*

                if($scope.loginForm.email.$modelValue != "s@s" || $scope.loginForm.password.$modelValue != "s") {
                    $scope.wrongUser = true;
                    $scope.loginForm.email.$touched = false;
                    $scope.loginForm.password.$touched = false;
                    $scope.user = {};
                }
                else {
                    $scope.wrongUser = false;                    
                    $location.path("#/");
                }*/
            }
        }
    }]);