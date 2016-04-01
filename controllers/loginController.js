var loginController = angular.module('loginController', []);

loginController.controller('LoginController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.something = 'LoginController';
        $scope.user = {};
        $scope.submitLogin = function () {
            if ($scope.loginForm.$valid) {
                $scope.wrongUser = false;

                if($scope.loginForm.email.$modelValue != "s@s" || $scope.loginForm.password.$modelValue != "s") {
                    $scope.wrongUser = true;
                    $scope.loginForm.email.$touched = false;
                    $scope.loginForm.password.$touched = false;
                    $scope.user = {};
                }
                else {
                    $scope.wrongUser = false;                    
                    $location.path("#/");
                }
            }
        }
    }]);