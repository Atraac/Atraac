var myProfileController = angular.module('myProfileController', []);
myProfileController.controller('MyProfileController', ['$scope',
    function ($scope) {
        $scope.something = 'MyProfileController';
    }]);