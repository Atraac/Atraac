var loginController = angular.module('loginController', ['ngCookies', 'accountFactory']);

loginController.controller('LoginController', ['$scope', '$location', '$rootScope', 'Account', '$localStorage', '$window',
    function ($scope, $location, $rootScope, Account, $localStorage, $window) {

        $scope.user = {};

        $scope.submitLogin = function () {
            if ($scope.loginForm.$valid) {                
                $window.localStorage.removeItem('X-CustomToken');
                $scope.wrongUser = false;
                
                Account.logIn($scope.user.email, $scope.user.password).then(function (response) {
                    if(response.status == 200) {
                        var token = response.headers('X-CustomToken');
                        $window.localStorage.setItem('X-CustomToken', token);
                        $location.path("#/");
                        $rootScope.logged = true;

                        Account.getCurrentUser().then(function (response) {
                            $rootScope.loggedUser = response.data;
                        }, function(error){
                            console.log("currentUserError: " + error);
                        });

                        $scope.wrongUser = false;
                        $location.path("#/");
                    }
                }, function (error) {
                    console.log("currentUserErrorStatus: " + error.status);
                    $rootScope.logged = false;
                    $scope.wrongUser = true;
                    $scope.loginForm.email.$touched = false;
                    $scope.loginForm.password.$touched = false;
                    $scope.user = {};
                });
            }
        }
    }]);