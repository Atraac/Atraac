var myTransportsController = angular.module('myTransportsController', ['transportFactory']);

myTransportsController.controller('MyTransportsController', ['$scope', 'Transport',
    function ($scope, Transport) {

        Transport.getDriverTransports().then(function (response) {
            $scope.transports = response.data;    
        }, function(error){
            console.log("getDriverTransportsError: "+error);
        });
    }]);