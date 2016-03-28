var searchTransportController = angular.module('searchTransportController', []);

searchTransportController.controller('SearchTransportController', ['$scope',
    function ($scope) {
        $('.ui.dropdown').dropdown({
            fields: { name: "name", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json/{query}'
            }
        });
    }]);