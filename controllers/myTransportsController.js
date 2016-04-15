var myTransportsController = angular.module('myTransportsController', ['transportFactory']);

myTransportsController.controller('MyTransportsController', ['$scope', '$rootScope', 'Transport',
    function ($scope, $rootScope, Transport) {

        Transport.getDriverTransports().then(function (response) {
            $scope.transports = response.data;    
        }, function(error){
            console.log("getDriverTransportsError: "+error);
        });
    }]);