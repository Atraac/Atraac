var profileController = angular.module('profileController', ['userFactory']);
profileController.controller('ProfileController', ['$scope', 'User', '$location', '$rootScope', '$routeParams',
    function ($scope, User, $location, $rootScope, $routeParams) {
        $scope.something = 'ProfileController';
        $scope.user = {};
        User.getUser($routeParams.userId).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                console.log($scope.user);
            }
        }, function(error){
            console.log("getUser: "+ error);
        });
        $scope.onUpdateProfile = function(){
            console.log($scope.User);
            $location.path("/profile/"+$rootScope.loggedUser.id);
        }
    }]);