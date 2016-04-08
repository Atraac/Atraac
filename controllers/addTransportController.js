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

        $scope.transport = { };
        $scope.routes = {
            point0 : null,
            point1 : null,
            point2 : null,
            point3 : null,
            point4 : null,
            point5 : null,
            point6 : null,
            point7 : null
        };

        $scope.addTransport = function() {
            $scope.transport.idUser = $rootScope.loggedUser.id;
            $scope.transport.preferences = $scope.selection;
            $scope.transport.cities = [$scope.point0, $scope.point1, $scope.point2, $scope.point3, $scope.point4, $scope.point5, $scope.point6, $scope.point7];
            Transport.addTransport($scope.transport).then(function(response){
                $scope.message = response.data;
                console.log($scope.message);
            });
        }
    }]);