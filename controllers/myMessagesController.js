var myMessagesController = angular.module('myMessagesController', ['messageFactory']);

myMessagesController.controller('MyMessagesController', ['$scope', '$rootScope', 'Message',
    function ($scope, $rootScope, Message) {

        $scope.getReceivedMessages = function() {
            Message.getUserReceivedMessages().then(function (response) {
                $scope.messages = response.data.receivedMessages;
                $scope.messages.reverse();
            }, function (error) {
                console.log("getUserReceivedMessages: " + error);
            });
        };

        $scope.getSentMessages = function() {
            Message.getUserSentMessages().then(function (response) {
                $scope.messages = response.data.sentMessages;
                $scope.messages.reverse();
            }, function(error){
                console.log("getUserSentMessages: "+error);
            });
        };

        $scope.setView = function(newView) {
            if(newView == "received") {
                $scope.getReceivedMessages();
                $scope.currentViewText = "Odebrane wiadomości";
            }
            else if(newView == "sent") {
                $scope.getSentMessages();
                $scope.currentViewText = "Wysłane wiadomości";
            }
        };

        $scope.receiverDoesntExist = false;

        $scope.sendMsg = function() {
            Message.sendMessageById($scope.sendMessage).then(function(response){
                if(response.data.result != true && response.status == 200) {
                    if(response.data.message ==="Receiver doesn't exist") {
                        $scope.receiverDoesntExist = true;
                    }
                }
                else if(response.data.result == true && response.status == 200) {
                    if($scope.currentViewText === "Odebrane wiadomości") {
                        $scope.setView('received');
                    }
                    else {
                        $scope.setView('sent');
                    }

                    $scope.sendMessage = {};
                    $scope.sendMsgModalForm.$setPristine();
                    $scope.sendMsgModalForm.$setUntouched();

                    $('#sendMsgModal')
                        .modal('hide');
                }
            });
        };

        $scope.showMsg = function(msgId) {
            for (var i = 0; i < $scope.messages.length; i++) {
                if ($scope.messages[i].id === msgId) {
                    $scope.viewMessage = $scope.messages[i];
                    break;
                }
            }
            $('#viewMsgModal')
                .modal('show');
        };

        $scope.reply = function() {
            if($scope.viewMessage.author.id == $rootScope.loggedUser.id) {
                $scope.sendMessage.receiverId = $scope.viewMessage.receiver.id;
            }
            else {
                $scope.sendMessage.receiverId = $scope.viewMessage.author.id;
            }
            $scope.sendMessage.title = "Re: " + $scope.viewMessage.title;
            $('#sendMsgModal')
                .modal('show');
        };

        $scope.sendMessage = {};
        $scope.viewMessage = {};
        $scope.getReceivedMessages();
        $scope.currentViewText = "Odebrane wiadomości";

    }]);