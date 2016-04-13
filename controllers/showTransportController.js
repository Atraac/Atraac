var showTransportController = angular.module('showTransportController', ['transportFactory', 'preferencesFactory', 'reservationFactory']);

showTransportController.controller('ShowTransportController', ['$scope', '$http', 'Transport', '$routeParams', 'Preferences', 'Reservation',
    function ($scope, $http, Transport, $routeParams, Preferences, Reservation) {
        $scope.something = 'ShowTransportController';
        $scope.transport = {};
        $scope.reservation = {};
        $scope.error = false;
        $scope.onModalReservation = function(){
            $scope.preferences = $scope.transport.preferences;
            $scope.reservation.selection = [];
            $scope.toggleSelection = function toggleSelection(preference) {
                var idx = $scope.reservation.selection.indexOf(preference);
                if (idx > -1) {
                    $scope.reservation.selection.splice(idx, 1);
                }
                else {
                    $scope.reservation.selection.push(preference);
                }
            };
            $scope.noPreference = false;
            $('.ui.small.modal').modal('show');
        };
        $scope.closeModal = function () {
            $('.ui.small.modal').modal('hide');
            $scope.noPreference = false;
        }
        $scope.noPreference = false;
        $scope.correctReservation = false;
        $scope.onReservation = function(){
            console.log("Reservation: "+$scope.reservation);
            if($scope.reservation.selection.length > 0){
                $scope.reservation.transportId = $scope.transport.id;
                Reservation.addReservation($scope.reservation).than(function(response){
                    $scope.correctReservation = true;
                    $scope.closeModal();
                }, function (error) {

                });
            }
            else {
                $scope.noPreference = true;
            }
        };

        Transport.getTransport($routeParams.transportId).then(function (response)
            {
                $scope.transport = response.data;
            }, function (error) {
                console.log(error);
                $scope.error = true;
            });
    }]);