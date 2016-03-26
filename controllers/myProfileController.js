var myProfileController = angular.module('myProfileController', ['ngResource', 'userFactory']);
myProfileController.controller('MyProfileController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'MyProfileController';
        User.getUser().then(function (response) {
            $scope.User = response.data;
            $scope.User.birthdate = new Date(response.data.birthdate);
        })
        $scope.onEdit = function(){
            console.log($scope.User);
        }
    }]);