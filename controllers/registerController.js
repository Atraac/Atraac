var registerController = angular.module('registerController', ['accountFactory', 'ngCapsLock']);
registerController.controller('RegisterController', ['$scope', '$rootScope', 'Account',
    function ($scope, $rootScope, Account) {
        // for yanek
        if(!$rootScope.yanek) {
            $scope.user = {
                birthDate: "1993-07-30T22:00:00.000Z",
                sex: "M"
            };
        }
        else {
            $scope.user = {};
        }

        $('#birthDate').on('apply.daterangepicker', function(ev, picker) {
        }).daterangepicker(
            {
                singleDatePicker : true,
                showDropdowns : true,
                locale: {
                    applyLabel: 'Wybierz',
                    cancelLabel: 'Wyczyść',
                    fromLabel: 'Od',
                    toLabel: 'Do',
                    daysOfWeek: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
                    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                    firstDay: 1
                }
            }
        );
        
        $scope.isDateValid = function() {
            return ((new Date() <= new Date($scope.user.birthDate)) && ($scope.registerForm.birthDate.$dirty));
        };

        $scope.correctRegister = false;
        $scope.duplicateEmail = '';
        $scope.passwordAgain = '';
        $scope.sexes = [ {"M": "Mężczyzna"}, { "K": "Kobieta"}];
        $scope.hasSex = true;
        $scope.onRegister = function () {
            console.log('User:'+$scope.user);
            if($scope.user.sex!=null) {
                $scope.correctRegister = false;
                $scope.hasSex = true;
                $scope.user.birthDate = new Date($scope.user.birthDate);
                Account.register($scope.user).then(function (response) {
                    if(response.status == 200)
                    {
                        $scope.correctRegister = response.data.result;
                        $scope.duplicateEmail = response.data.message;
                        console.log("Message: " + response.data.message);
                    }
                }, function (error) {
                    console.log("registerError: " + error);
                });

                if(!$scope.correctRegister) {
                    $scope.registerForm.email.$touched = false;
                    $scope.registerForm.password.$touched = false;
                    $scope.registerForm.passwordAgain.$touched = false;
                    $scope.passwordAgain = '';
                }
            }
            else {
                $scope.hasSex = false;
            }
        }
    }
]);