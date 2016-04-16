var showTransportController = angular.module('showTransportController', 
    ['transportFactory', 'preferencesFactory', 'reservationFactory']);

showTransportController.controller('ShowTransportController', 
    ['$rootScope', '$scope', '$http', 'Transport', '$routeParams', 'Preferences', 'Reservation',
    function ($rootScope, $scope, $http, Transport, $routeParams, Preferences, Reservation) {
        'use strict'
        $scope.something = 'ShowTransportController';
        $scope.transport = {};
        $scope.reservation = {};
        $scope.error = false;
        $scope.userIsDriver = false;
        $scope.noPreference = false;
        $scope.error = false;
        $scope.correctReservation = false;
        $scope.reservationInModal = null;

        $scope.acceptReservation = function(reservationId){
            $('#acceptReservationModal').modal('show');
            $scope.reservationInModal = reservationId;
        };
        
        $scope.acceptReservationModalOK = function(){
             Reservation.acceptReservation($scope.reservationInModal).then(function(response){
                console.log("acceptReservationSucces:"+response);
                $scope.acceptReservationModalCancel();
                getCurrentTransport();
             }, function(error){
                console.log("acceptReservationError:"+error);
             });
        };

        $scope.acceptReservationModalCancel = function(){
            $('#acceptReservationModal').modal('hide');
        };

        $scope.rejectReservation = function(reservationId){
            $('#rejectReservationModal').modal('show');
            $scope.reservationInModal = reservationId;

        };

        $scope.rejectReservationModalOK = function(){
            Reservation.rejectReservation($scope.reservationInModal).then(function(response){
                console.log("rejectReservationSucces:"+response);
                $scope.rejectReservationModalCancel();
                getCurrentTransport();
            }, function(error){
                console.log("rejectReservationError:"+error);
            });
        };

        $scope.rejectReservationModalCancel = function(){
            $('#rejectReservationModal').modal('hide');
        };

        $scope.onModalReservation = function(){
            $scope.preferences = $scope.transport.preferences;
            $scope.reservation.preferences = [];
            $scope.toggleSelection = function toggleSelection(preference) {
                var idx = $scope.reservation.preferences.indexOf(preference);
                if (idx > -1) {
                    $scope.reservation.preferences.splice(idx, 1);
                }
                else {
                    $scope.reservation.preferences.push(preference);
                }
            };
            $scope.noPreference = false;
            $('#addReservationModal').modal('show');
        };

        $scope.closeModal = function () {
            $('#addReservationModal').modal('hide');
            $scope.noPreference = false;
        }

        $scope.onReservation = function(){
            console.log("Reservation: "+$scope.reservation);
            if($scope.reservation.preferences.length > 0){
                $scope.reservation.transportId = $scope.transport.id;
                Reservation.addReservation($scope.reservation).then(function(response){
                    $scope.correctReservation = true;
                    getCurrentTransport();
                }, function (error) {
                    $scope.error = true;
                });
            }
            else {
                $scope.noPreference = true;
            }
        };

        var getCurrentTransport = function(){
            Transport.getTransport($routeParams.transportId).then(function (response)
            {
                $scope.transport = response.data;
                $scope.userIsDriver = $rootScope.loggedUser.id === $scope.transport.driver.id;
                for (var index = 0; index <= $scope.transport.reservations.length; index++) {
                    if($scope.transport.reservations[index].sender.id === $rootScope.loggedUser.id)
                    {
                        $scope.userReservation = $scope.transport.reservations[index];
                        break;
                    }
                    else {
                        if($scope.transport.reservations[index].reciever != null){
                            if($scope.transport.reservations[index].reciever.id === $rootScope.loggedUser.id){
                                $scope.userReservation = $scope.transport.reservations[index];
                                break;
                            }
                        }
                    }
                }
            }, function (error) {
                console.log(error);
                $scope.error = true;
            });
        }

        getCurrentTransport();
    }]);