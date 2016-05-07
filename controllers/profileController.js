var profileController = angular.module('profileController', ['userFactory', 'commentFactory', 'messageFactory']);
profileController.controller('ProfileController', ['$scope', 'User', '$location', '$rootScope', '$routeParams', 'Comment', 'Message',
    function ($scope, User, $location, $rootScope, $routeParams, Comment, Message) {
        $scope.userLoaded = false;
        $scope.commentLoaded = false;
        $scope.user = null;
        $scope.notifications = null;
        $scope.comments = null;
        $scope.isCurrentUserProfile = null;
        $scope.commentInModal = null;

        $scope.openReplyCommentModal = function(comment){
            $scope.commentInModal = comment;
            $('#replyCommentModal').modal('show');
        };

        $scope.closeReplyCommentModal = function(){
            $('#replyCommentModal').modal('hide');
        };

        User.getUser($routeParams.userId).then(function (response) {
            if(response.status == 200) {
                $scope.user = response.data;
                $scope.user.birthDate = new Date(response.data.birthDate);
                $scope.isCurrentUserProfile = $routeParams.userId==$rootScope.loggedUser.id;
                if($scope.isCurrentUserProfile){
                    $scope.getNotifications();
                }
                $scope.userLoaded = true;
            }
        }, function(error){
            console.log("getUser: "+ error);
            $scope.userLoaded = true;
        });

        $scope.getNotifications = function () {
            User.getNotifications().then(function (response) {
                $scope.notifications = response.data;
            }, function(error){
                console.log(error);
            });
        }

        $scope.deleteNotification = function (notificationId) {
            User.deleteNotification(notificationId).then(function (response) {
                if(response.data.result === true){
                    $rootScope.loggedUser.notificationQuantity--;
                }
                $scope.getNotifications();
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getUserComments = function()
        {
            Comment.getUserComments($routeParams.userId).then(function (response) {
                $scope.comments = response.data.comments;
                $scope.commentLoaded = true;
            }, function (error) {
                $scope.commentLoaded = true;
                console.log(error);
            });
        }

        $scope.getUserComments();

        $scope.replyToComment = function(){
            $scope.commentReply.commentId = $scope.commentInModal.id;
            Comment.replyToComment($scope.commentReply).then(function (response) {
                console.log(response.data);
                $scope.closeReplyCommentModal();
                $scope.getUserComments();
            }, function (error) {
                console.log(error.toString);
            });
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