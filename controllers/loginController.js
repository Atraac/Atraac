var loginController = angular.module('loginController', ['ngCookies', 'accountFactory']);

loginController.controller('LoginController', ['$scope', '$location', '$rootScope', 'Account',
    function ($scope, $location, $rootScope, Account) {
        $scope.user = {};

        $scope.submitLogin = function () {
            if ($scope.loginForm.$valid) {
                $scope.wrongUser = false;
                
                Account.logIn($scope.user.email, $scope.user.password).then(function (response) {
                    if(response.status == 200) {                        
                        $rootScope.logged = true;
                        Account.getCurrentUser().then(function (response) {
                            $rootScope.user = response.data;
                        }, function(error){
                            console.log("currentUserError: " + error);
                        });
                    }
                }, function (error) {
                    console.log('logInError: '+error.message);
                    $rootScope.logged = false;
                });

                if($rootScope.logged){
                    $scope.wrongUser = false;
                    $location.path("#/");
                }
                else {
                    $scope.wrongUser = false;
                    $scope.loginForm.email.$touched = false;
                    $scope.loginForm.password.$touched = false;
                    $scope.user = {};
                }
            }
        }
    }]);