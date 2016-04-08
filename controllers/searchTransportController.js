var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Urls', 'Transport', '$http', '$rootScope',
    function ($scope, Urls, Transport, $http, $rootScope) {

        $http.get(Urls.Base+'cities')
            .then(function (response)
            {
                $scope.cities = response.data.cities;
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

        // ng-show var to control search results table
        $scope.searchResults = false;

        // search function
        $scope.onSearch = function() {

            Transport.getTransports($scope.searchTransport).then(function(response){
                if (response.status == 200) {
                    $scope.transports = response.data;
                    console.log($scope.transports);
                    // show results table after search
                    $scope.searchResults = true;
                }
            });

        };

        // checkbox control
        $http.get(Urls.Base+'preferences')
            .then(function (response)
            {
                $scope.preferences = response.data.preferences;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

        // selected preferences
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
    }]);