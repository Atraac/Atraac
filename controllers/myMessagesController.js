var myMessagesController = angular.module('myMessagesController', []);

myMessagesController.controller('MyMessagesController', ['$scope',
    function ($scope) {
        $scope.something = 'MyMessagesController';
    }]);