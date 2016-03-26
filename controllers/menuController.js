var menuController = angular.module('menuController', []);
menuController.controller('MenuController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.url());
            return active;
        };
    }]);
