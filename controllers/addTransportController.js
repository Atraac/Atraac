var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', ['$scope',
    function ($scope) {
        $('.ui.dropdown').dropdown({
            fields: { name: "name", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json/{query}'
            }
        });

        $('#transport-pack-types').dropdown({
            fields: { name: "type", value: "id" },
            apiSettings: {
                url: './fixedObject/pack-types.json/'
            }
        });
        $scope.onSubmit = function ()   {
            //alert("asd");
            var returnedText = $('#transport-through').dropdown('get value', returnedText);
            alert(returnedText);
        }
    }]);