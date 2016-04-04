var registerController = angular.module('registerController', ['accountFactory']);
registerController.controller('RegisterController', ['$scope', 'Account', '$http',
    function ($scope, Account, $http) {
        $scope.user = {};
        $scope.correctRegister = false;
        $scope.duplicateEmail = false;
        $scope.passwordAgain = '';

        $scope.onRegister = function () {
            console.log('User:'+$scope.user);
            $scope.correctRegister = false;

            Account.register(user).then(function (response) {
                $scope.correctRegister = response.data.correct;
                $scope.duplicateEmail = response.data.duplicate;
            }, function (error) {
                console.log("registerError: " + error);
            });

            if(!$scope.correctRegister) {
                $scope.user.email = '';
                $scope.user.password = '';
                $scope.user.passwordAgain = '';
            }
        }
    }
]);