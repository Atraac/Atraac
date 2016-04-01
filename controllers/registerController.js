
var registerController = angular.module('registerController', ['userFactory']);

registerController.controller('RegisterController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'RegisterController';
        $scope.user = {};
        $scope.correctRegister = false;
        $scope.onRegister = function () {
            console.log($scope.user);
            $scope.correctRegister = true;
        }
    }
]);

$('.small.modal')
    .modal('show')
;