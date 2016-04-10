var addTransportController = angular.module('addTransportController', ['citiesFactory', 'preferencesFactory', 'transportFactory']);
addTransportController.controller('AddTransportController', [ '$scope', 'Urls', 'Cities', 'Preferences', '$http', 'Transport', '$rootScope',
    function ($scope, Urls, Cities, Preferences, $http, Transport, $rootScope) {

        // fill dropdowns with cities
        Cities.getCities().then(function (response) {
            $scope.cities = response.data.cities;
        });

        // checkbox control
        Preferences.getPreferences().then(function (response) {
            $scope.preferences = response.data.preferences;
        });

        // selected preferences
        $scope.selection = [];

        // toggle selection for a given packtype by name
        $scope.toggleSelection = function toggleSelection(preference) {
            var idx = $scope.selection.indexOf(preference);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection.push(preference);
            }
        };

        // drive-through dropdowns control
        $scope.points=1;
        $scope.addPoint = function(num) {
            if ($scope.points < num) {
                $scope.points = num;
            }
        };

        // setting up ng-models
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

        // parsing to array for API
        $scope.parseRoutes = function(){
            return $scope.parsedRoutes = [$scope.routes.point0, $scope.routes.point1, $scope.routes.point2, $scope.routes.point3, $scope.routes.point4, $scope.routes.point5, $scope.routes.point6, $scope.routes.point7];
        };

        // add transport submit function
        $scope.addTransport = function() {
            $scope.transport.userId = $rootScope.loggedUser.id;
            $scope.transport.preferences = $scope.selection;
            $scope.transport.cities = $scope.parseRoutes();
            Transport.addTransport($scope.transport).then(function(response) {
                $scope.message = response.data;
                console.log($scope.message);
            });
        }
    }]);