
var registerController = angular.module('registerController', ['userFactory']);

registerController.controller('RegisterController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'RegisterController';
        $scope.user = {
            email: '',
            password: '',
            passwordAgain: '',
            name: '',
            surname: '',
            birthdate: new Date(),
            sex: '',
            car: '',
            photo: '',
            phoneNumber: ''
        }
        $scope.onRegister = function () {
            console.log($scope.user);
        }
    }
]);