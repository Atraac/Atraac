var showTransportController = angular.module('showTransportController', []);

showTransportController.controller('ShowTransportController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.something = 'ShowTransportController';
        $scope.transport = {};
        $http.get('./fixedObject/showTransport.json')
            .then(function (response)
            {
                $scope.transport = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });
    }]);