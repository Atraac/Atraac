var myPackagesController = angular.module('myPackagesController', ['reservationFactory']);

myPackagesController.controller('MyPackagesController', ['$scope', '$rootScope', 'Reservation',
    function ($scope, $rootScope, Reservation) {
        $scope.contentLoaded = false;
        Reservation.getUserReservations().then(function (response) {
            $scope.reservations = response.data;
            $scope.contentLoaded = true;
        }, function(error){
            console.log("getUserReservationsError: "+error);
        });
    }]);