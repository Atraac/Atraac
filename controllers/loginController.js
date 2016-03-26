var loginController = angular.module('loginController', []);

loginController.controller('LoginController', ['$scope',
    function ($scope) {
        $scope.something = 'LoginController';
        $scope.user = {email : '', password: ''};
        $scope.onLogin = function () {
            alert("Login: " + $scope.user.email + "\n" + "Hasło: " + $scope.user.password);
        }
    }]);