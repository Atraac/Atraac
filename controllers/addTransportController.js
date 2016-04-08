var addTransportController = angular.module('addTransportController', ['transportFactory']);
addTransportController.controller('AddTransportController', [ '$scope', '$http', 'Transport', '$rootScope',
    function ($scope, $http, Transport, $rootScope) {

        $http.get('./fixedObject/cities.json')
            .then(function (response)
            {
                $scope.cities = response.data;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });
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

        $scope.transport = {
            idUser : $rootScope.user.id,
            packtypes : $scope.selection
        };

        $scope.addTransport = function() {
            Transport.addTransport($scope.transport).then(function(response){
                $scope.message = response.data;
                console.log($scope.message);
            });
        }
    }]);