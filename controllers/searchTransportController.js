var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Transport',
    function ($scope, Transport) {
        $scope.order = 'departureDate';
        $scope.reverse = false;
        $scope.changeOrder = function(order){
            $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
            $scope.order = order;
        };
        $scope.transports = {};
        Transport.getTransports().then(function(response){
            $scope.transports = response.data;
            console.log($scope.transports);
        });
        $('.ui.dropdown').dropdown({
            fields: { name: "name", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json/{query}'
            }
        });
    }]);

