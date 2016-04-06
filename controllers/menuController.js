var menuController = angular.module('menuController', ['accountFactory']);
menuController.controller('MenuController', ['Account', '$scope', '$location', '$http', '$rootScope',
    function (Account, $scope, $location, $http, $rootScope) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.url());
            return active;
        };
        $scope.logOut = function()
        {            
            Account.logOut();
            $rootScope.user = {};
            $rootScope.logged = false;
            $location.path("#/");
            console.log($rootScope.user)
            console.log($rootScope.logged)
        };
    }]);
