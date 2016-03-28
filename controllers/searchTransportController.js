var searchTransportController = angular.module('searchTransportController', []);

searchTransportController.controller('SearchTransportController', ['$scope', 'Transport',
    function ($scope, transport) {
        $('.ui.dropdown').dropdown({
            fields: { name: "description"},
            apiSettings: {
                mockResponse: {
                    success: true,
                    results: [
                        {"description":"Opole"},
                        {"description":"Wrocław"},
                        {"description":"Warszawa"},
                        {"description":"Budapest"},
                        {"description":"Köln"}
                    ]
                }
            }
        });
        $scope.transport.date = new Date();
    }]);