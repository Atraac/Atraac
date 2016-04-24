var myTransportsController = angular.module('myTransportsController', ['transportFactory']);

myTransportsController.controller('MyTransportsController', ['$scope', '$rootScope', 'Transport',
    function ($scope, $rootScope, Transport) {
        $scope.contentLoaded = false;
        Transport.getDriverTransports().then(function (response) {
            $scope.transports = response.data;
            $scope.contentLoaded = true;
        }, function(error){
            console.log("getDriverTransportsError: "+error);
        });
    }]);