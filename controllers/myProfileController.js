var myProfileController = angular.module('myProfileController', ['ngResource', 'userFactory']);
myProfileController.controller('MyProfileController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'MyProfileController';
        User.getUser().then(function (response) {
            $scope.user = response.data;
            $scope.user.birthdate = new Date(response.data.birthdate);
        })
        $scope.onSubmitUpdate = function(){
            console.log($scope.User);
        }
    }]);