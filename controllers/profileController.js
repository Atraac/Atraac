var profileController = angular.module('profileController', ['userFactory', 'commentFactory', 'messageFactory']);
profileController.controller('ProfileController', ['$scope', 'User', '$location', '$rootScope', '$routeParams', 'Comment', 'Message',
    function ($scope, User, $location, $rootScope, $routeParams, Comment, Message) {
        $scope.userLoaded = false;
        $scope.commentLoaded = false;
        $scope.user = null;
        $scope.comments = null;
        $scope.isCurrentUserProfile = null;

        User.getUser($routeParams.userId).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                $scope.isCurrentUserProfile = $routeParams.userId==$rootScope.loggedUser.id;
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

        $scope.openReplyCommentModal = function (commentId) {
            
        };

        $scope.sendMessage = {};

        $scope.contact = function() {
            $scope.sendMessage.receiverId = $routeParams.userId;
            $('#sendMsgModal')
                .modal('show');
        };
        
        $scope.sendMsg = function() {
            Message.sendMessageById($scope.sendMessage).then(function(response){
                if(response.data.result != true && response.status == 200) {
                    if(response.data.message ==="Receiver doesn't exist") {
                        $scope.receiverDoesntExist = true;
                    }
                }
                    $scope.sendMessage = {};
                    $scope.sendMsgModalForm.$setPristine();
                    $scope.sendMsgModalForm.$setUntouched();

                    $('#sendMsgModal')
                        .modal('hide');
            });
        };
    }]);