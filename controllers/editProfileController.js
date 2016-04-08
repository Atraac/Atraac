var editProfileController = angular.module('editProfileController', ['userFactory']);
editProfileController.controller('EditProfileController', ['$scope', 'User', '$location', '$rootScope',
    function ($scope, User, $location, $rootScope) {
        $scope.something = 'EditProfileController';
        $scope.user = {};
        User.getUser($rootScope.loggedUser.id).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                console.log($scope.user);
            }
        }, function(error){
            console.log("getUser: "+ error);
        });
        $scope.onUpdateProfile = function(){
            var editUser = {phoneNumber: $scope.user.phoneNumber, car: $scope.user.car};
            console.log(editUser);
            User.editUser(editUser).then(function (response) {
                console.log("EditUserMesage: "+ response.data);
            }, function (error) {
                console.log("EditUser: "+ error);
            });
            $location.path("/profile/"+$rootScope.loggedUser.id);
        }
    }]);