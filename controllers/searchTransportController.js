var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Transport', '$http', '$rootScope',
    function ($scope, Transport, $http, $rootScope) {

        $http.get('./fixedObject/cities.json')
            .then(function (response)
            {
                $scope.cities = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

        $scope.order = 'departureDate';
        $scope.reverse = false;
        $scope.changeOrder = function(order){
            $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
            $scope.order = order;
        };

        $scope.searchTransport = {
            idUser : $rootScope.loggedUser.id,
            preferences : $scope.selection
        };

        $scope.searchResults=false;
        // search function
        $scope.onSearch = function() {
            // show results table after search
            Transport.getTransports($scope.searchTransport).then(function(response){
                if (response.status == 200) {
                    $scope.transports = response.data;
                    console.log($scope.transports);
                    $scope.searchResults = true;
                }
            });
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