var myPackagesController = angular.module('myPackagesController', ['reservationFactory']);

myPackagesController.controller('MyPackagesController', ['$scope', '$rootScope', 'Reservation',
    function ($scope, $rootScope, Reservation) {
        Reservation.getUserReservations().then(function (response) {
            $scope.reservations = response.data;
        }, function(error){
            console.log("getUserReservationsError: "+error);
        });
    }]);