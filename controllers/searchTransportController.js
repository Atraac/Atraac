var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Transport',
    function ($scope, Transport) {
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

