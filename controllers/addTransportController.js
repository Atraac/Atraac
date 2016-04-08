var addTransportController = angular.module('addTransportController', ['transportFactory']);
addTransportController.controller('AddTransportController', [ '$scope', 'Urls', '$http', 'Transport', '$rootScope',
    function ($scope, Urls, $http, Transport, $rootScope) {

        $http.get(Urls.Base+'cities')
            .then(function (response)
            {
                $scope.cities = response.data.cities;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });


        // checkbox control

        $http.get(Urls.Base+'preferences')
            .then(function (response)
            {
                $scope.packtypes = response.data.preferenceList;
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
                $scope.selection.push(packtype);
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

        $scope.parseRoutes = function(){
            return $scope.parsedRoutes = [$scope.routes.point0, $scope.routes.point1, $scope.routes.point2, $scope.routes.point3, $scope.routes.point4, $scope.routes.point5, $scope.routes.point6, $scope.routes.point7];
        };

        $scope.packtypesError = false;
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