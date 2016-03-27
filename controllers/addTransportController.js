var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', ['$scope',
    function ($scope) {
        $scope.something = 'AddTransportController';

        $('.ui.dropdown').dropdown({
            fields: { name: "description", value: "data-value" },
            apiSettings: {
                mockResponse: {
                    success: true,
                    results: [
                        {"description":"Opole","data-value":1},
                        {"description":"Wrocław","data-value":2},
                        {"description":"Warszawa","data-value":3},
                        {"description":"Budapest","data-value":4},
                        {"description":"Köln","data-value":5}
                    ]
                }
            }
        });

        $scope.onSubmit = function ()   {
           
        }
    }]);