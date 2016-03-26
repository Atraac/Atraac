var loginController = angular.module('loginController', []);

loginController.controller('LoginController', ['$scope',
    function ($scope) {
        $scope.something = 'LoginController';
        $scope.user = {login : '', password: ''};
        $scope.onLogin = function () {
            alert("Login: " + $scope.user.login + "\n" + "Hasło: " + $scope.user.password);
        }
    }]);