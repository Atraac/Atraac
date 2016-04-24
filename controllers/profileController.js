var profileController = angular.module('profileController', ['userFactory', 'commentFactory']);
profileController.controller('ProfileController', ['$scope', 'User', '$location', '$rootScope', '$routeParams', 'Comment',
    function ($scope, User, $location, $rootScope, $routeParams, Comment) {
        $scope.userLoaded = false;
        $scope.commentLoaded = false;
        $scope.user = null;
        $scope.comments = null;
        $scope.isCurrentUserProfile = $routeParams.userId==$rootScope.loggedUser.id;

        User.getUser($routeParams.userId).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                $scope.userLoaded = true;
            }
        }, function(error){
            console.log("getUser: "+ error);
            $scope.userLoaded = true;
        });

        Comment.getUserComments($routeParams.userId).then(function (response) {
            $scope.comments = response.data.comments;
            $scope.commentLoaded = true;
        }, function (error) {
            $scope.commentLoaded = true;
            console.log(error);
        });
    }]);