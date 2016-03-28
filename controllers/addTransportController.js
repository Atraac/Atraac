var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', ['$scope',
    function ($scope) {
        $('.ui.dropdown').dropdown({
            fields: { name: "city", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json'
            }
        });
        $('#pack-types-dropdown').dropdown({
            fields: { name: "type", value: "id" },
            apiSettings: {
                url: './fixedObject/pack-types.json'
            }
        })
        $scope.onSubmit = function ()   {
           
        }
    }]);