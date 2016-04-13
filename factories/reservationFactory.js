var reservationFactory = angular.module('reservationFactory', []);
reservationFactory.factory('Reservation', ['$http', 'Urls',
    function ($http, Urls){
        var Reservation = {};

        Reservation.getUserReservations = function(userId){
            return $http.get(Urls.Base+"reservations/"+userId);
        };

        return Reservation;
    }]);