var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Transport', '$http',
    function ($scope, Transport, $http) {
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
        $scope.searchResults=false;
        $scope.onSearch = function() {
            // show results table after search
            $scope.searchResults=true;
        };

        // syf do obslugi checkboxow

        $http.get('./fixedObject/packtypes.json')
            .then(function (response)
            {
                $scope.packtypes = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

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
    }]);

