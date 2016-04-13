var showTransportController = angular.module('showTransportController', ['transportFactory']);

showTransportController.controller('ShowTransportController', ['$scope', '$http', 'Transport', '$routeParams',
    function ($scope, $http, Transport, $routeParams) {
        $scope.something = 'ShowTransportController';
        $scope.transport = {};
        $scope.error = false;
        Transport.getTransport($routeParams.transportId).then(function (response)
            {
                $scope.transport = response.data;
            }, function (error) {
                console.log(error);
                $scope.error = true;
            });
    }]);