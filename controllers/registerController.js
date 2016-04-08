var registerController = angular.module('registerController', ['accountFactory']);
registerController.controller('RegisterController', ['$scope', 'Account', '$http',
    function ($scope, Account, $http) {
        $scope.user = {};
        $scope.correctRegister = false;
        $scope.duplicateEmail = '';
        $scope.passwordAgain = '';
        $scope.sexes = [ {"M": "Mężczyzna"}, { "K": "Kobieta"}];
        $scope.onRegister = function () {
            console.log('User:'+$scope.user);
            $scope.correctRegister = false;

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
    }
]);