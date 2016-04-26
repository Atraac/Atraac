var myMessagesController = angular.module('myMessagesController', ['messageFactory']);

myMessagesController.controller('MyMessagesController', ['$scope', '$rootScope', 'Message',
    function ($scope, $rootScope, Message) {

        $scope.messagesLoaded = false;
        $scope.currentMessages = [];
        $scope.pageNumber = 1;
        $scope.totalPages = 1;
        $scope.resultsPerPage = 6;

        $scope.messageSent = true;

        $scope.getReceivedMessages = function() {
            Message.getUserReceivedMessages().then(function (response) {
                $scope.messages = response.data.receivedMessages;
                $scope.messages.reverse();
                $scope.currentMessages = $scope.messages.slice(0, $scope.resultsPerPage);
                $scope.pageNumber = 1;
                $scope.totalPages = Math.ceil($scope.messages.length / $scope.resultsPerPage) - 1;
                $scope.messagesLoaded = true;
            }, function (error) {
                console.log("getUserReceivedMessages: " + error);
            });
        };

        $scope.getSentMessages = function() {
            Message.getUserSentMessages().then(function (response) {
                $scope.messages = response.data.sentMessages;
                $scope.messages.reverse();
                $scope.currentMessages = $scope.messages.slice(0, $scope.resultsPerPage);
                $scope.pageNumber = 1;
                $scope.totalPages = Math.ceil($scope.messages.length / $scope.resultsPerPage) - 1;
                $scope.messagesLoaded = true;
            }, function(error){
                console.log("getUserSentMessages: "+error);
            });
        };

        $scope.getPreviousMessages = function() {
            if($scope.pageNumber > 1) {
                $scope.pageNumber--;
                $scope.currentMessages = $scope.messages.slice(($scope.pageNumber - 1) * $scope.resultsPerPage, $scope.pageNumber * $scope.resultsPerPage);

            }
        };

        $scope.getNextMessages = function() {
            if($scope.pageNumber < $scope.totalPages) {
                $scope.pageNumber++;
                $scope.currentMessages = $scope.messages.slice($scope.pageNumber * $scope.resultsPerPage, ($scope.pageNumber + 1) * $scope.resultsPerPage);
            }
        };

        $scope.setView = function(newView) {
            if(newView == "received") {
                $scope.messagesLoaded = false;
                $scope.getReceivedMessages();
                $scope.currentViewText = "Odebrane wiadomości";
            }
            else if(newView == "sent") {
                $scope.messagesLoaded = false;
                $scope.getSentMessages();
                $scope.currentViewText = "Wysłane wiadomości";
            }
        };

        $scope.receiverDoesntExist = false;

        $scope.sendMsg = function() {
            $scope.messageSent = false;
            Message.sendMessageById($scope.sendMessage).then(function(response){
                if(response.data.result != true && response.status == 200) {
                    if(response.data.message ==="Receiver doesn't exist") {
                        $scope.receiverDoesntExist = true;
                        $scope.messageSent = true;
                    }
                }
                else if(response.data.result == true && response.status == 200) {
                    $scope.messageSent = true;
                    
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