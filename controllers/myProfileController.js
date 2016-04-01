var myProfileController = angular.module('myProfileController', ['ngResource', 'userFactory']);
myProfileController.controller('MyProfileController', ['$scope', 'User', '$location',
    function ($scope, User, $location) {
        $scope.something = 'MyProfileController';
        User.getUser().then(function (response) {
            $scope.user = response.data;
            $scope.user.birthDate = new Date(response.data.birthDate);
            $scope.rating = Math.round($scope.user.rating);
        })
        $scope.onUpdateProfile = function(){
            console.log($scope.User);
            $location.path("/my-profile");
        }
    }]);