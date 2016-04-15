var showTransportController = angular.module('showTransportController', 
    ['transportFactory', 'preferencesFactory', 'reservationFactory']);

showTransportController.controller('ShowTransportController', 
    ['$rootScope', '$scope', '$http', 'Transport', '$routeParams', 'Preferences', 'Reservation',
    function ($rootScope, $scope, $http, Transport, $routeParams, Preferences, Reservation) {
        $scope.something = 'ShowTransportController';
        $scope.transport = {};
        $scope.reservation = {};
        $scope.error = false;
        $scope.userIsDriver = false;
        $scope.noPreference = false;
        $scope.error = false;
        $scope.correctReservation = false;




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
            $('.ui.small.modal').modal('show');
        };

        $scope.closeModal = function () {
            $('.ui.small.modal').modal('hide');
            $scope.noPreference = false;
        }

        $scope.onReservation = function(){
            console.log("Reservation: "+$scope.reservation);
            if($scope.reservation.preferences.length > 0){
                $scope.reservation.transportId = $scope.transport.id;
                Reservation.addReservation($scope.reservation).then(function(response){
                    $scope.correctReservation = true;
                }, function (error) {
                    $scope.error = true;
                });
            }
            else {
                $scope.noPreference = true;
            }
        };

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
    }]);