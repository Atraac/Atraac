var reservationFactory = angular.module('reservationFactory', []);
reservationFactory.factory('Reservation', ['$http', 'Urls',
    function ($http, Urls){
        var Reservation = {};

        Reservation.getUserReservations = function(){
            return $http.get(Urls.Base+"/users/reservations");
        };

        Reservation.addReservation = function(reservation){
            return $http.post(Urls.Base+"reservations", reservation);
        };

        Reservation.acceptReservation = function(reservationId){
            return $http.put(Urls.Base+"reservations/"+reservationId+"/accepted");
        };

        Reservation.rejectReservation = function(reservationId){
            return $http.put(Urls.Base+"reservations/"+reservationId+"/rejected");
        };
        
        return Reservation;
    }]);