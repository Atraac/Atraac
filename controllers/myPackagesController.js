var myPackagesController = angular.module('myPackagesController', []);

myPackagesController.controller('MyPackagesController', ['$scope',
    function ($scope) {
        $scope.something = 'MyPackagesController';
    }]);