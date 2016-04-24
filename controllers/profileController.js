var profileController = angular.module('profileController', ['userFactory', 'commentFactory']);
profileController.controller('ProfileController', ['$scope', 'User', '$location', '$rootScope', '$routeParams', 'Comment',
    function ($scope, User, $location, $rootScope, $routeParams, Comment) {
        $scope.something = 'ProfileController';
        $scope.user = {};
        $scope.comments = {};
        $scope.isCurrentUserProfile = $routeParams.userId==$rootScope.loggedUser.id;

        User.getUser($routeParams.userId).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                console.log($scope.user);
            }
        }, function(error){
            console.log("getUser: "+ error);
        });

        Comment.getUserComments($routeParams.userId).then(function (response) {
            $scope.comments = response.data;
        }, function (error) {
            console.log(error);
        });
    }]);