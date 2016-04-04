var loginController = angular.module('loginController', ['ngCookies']);

loginController.controller('LoginController', ['$scope', '$location', '$http', '$rootScope', '$cookies',
    function ($scope, $location, $http, $rootScope, $cookies) {
        $scope.something = 'LoginController';
        $scope.user = {};

        $scope.submitLogin = function () {
            if ($scope.loginForm.$valid) {
                $scope.wrongUser = false;

                var req = {
                    method: 'POST',
                    url: 'http://192.168.0.101:8080/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true,
                    data: "username="+$scope.user.email+"&"+"password="+$scope.user.password

                };
                $http(req)
                    .then(function (response)
                    {
                        console.log($cookies.get('JSESSIONID'));
                        console.log("Login: " + response.data +"\n"+response.headers('Set-Cookie'));
                        //console.log("Headers: " + response.headers());
                        $rootScope.logged = true;
                        $http.get('http://192.168.0.101:8080/users/current')
                            .then(function (response)
                            {
                                $rootScope.user = response.data;
                                console.log("user:" + response.data);
                            }, function (error) {
                                console.log("userError: " + error);
                            });
                    }, function (error) {
                        console.log("logError: " + error);
                        $rootScope.logged = false;
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