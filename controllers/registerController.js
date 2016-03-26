var registerController = angular.module('registerController', []);

registerController.controller('RegisterController', ['$scope',
    function ($scope) {
        $scope.something = 'RegisterController';
    }]);