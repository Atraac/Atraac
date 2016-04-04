var menuController = angular.module('menuController', []);
menuController.controller('MenuController', ['$scope', '$location', '$http', '$rootScope',
    function ($scope, $location, $http, $rootScope) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.url());
            return active;
        };
        $scope.logOut = function()
        {
            $http.get('http://192.168.0.101:8080/logout')
                .then(function (response)
                {
                    
                }, function (error) {
                    $scope.error = error;
                });
            $rootScope.user = {};
            $rootScope.logged = false;
            console.log($rootScope.user)
            console.log($rootScope.logged)
        };
    }]);
