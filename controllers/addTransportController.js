var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', [ '$scope', '$http', '$filter',
    function ($scope, $http, $filter) {

        $http.get('./fixedObject/cities.json')
            .then(function (response)
            {
                $scope.cities = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });
        $http.get('./fixedObject/packtypes.json')
            .then(function (response)
            {
                $scope.packtypes = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

        // syf do obslugi checkboxow

        // selected packtypes
        $scope.selection = [];

        // toggle selection for a given packtype by name
        $scope.toggleSelection = function toggleSelection(packtype) {
            var idx = $scope.selection.indexOf(packtype.name);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection.push(packtype.name);
            }
        };

        $scope.points=1;
        $scope.addPoint = function(num) {
            if ($scope.points < num) {
                $scope.points = num;
            }
        };
        $scope.transport = {
            idUser : '1',
            packtypes : $scope.selection
        };

        $scope.addTransport = function() {
            //po tym skroceniu daty, angular jeczy, ze spodziewa sie typowej daty w JSONie, a dostaje (chyba) string
            //$scope.transport.date=$filter('date')($scope.transport.date, 'mediumDate');
            console.log($scope.transport);
        }
    }]);