var myMessagesController = angular.module('myMessagesController', ['messageFactory']);

myMessagesController.controller('MyMessagesController', ['$scope', 'Message',
    function ($scope, Message) {
        $scope.getReceivedMessages = function() {
            Message.getUserReceivedMessages().then(function (response) {
                $scope.receivedMessages = response.data.receivedMessages;
                angular.forEach($scope.receivedMessages, function(eachObj) {
                    eachObj.title ='aaaaaa';
                });
            }, function (error) {
                console.log("getUserReceivedMessages: " + error);
            });
        };

        $scope.getSentMessages = function() {
            Message.getUserSentMessages().then(function (response) {
                $scope.sentMessages = response.data.sendedMessages; // literowka od nich do zmiany
                angular.forEach($scope.sentMessages, function(eachObj) {
                    eachObj.title ='aaaaaa';
                });
            }, function(error){
                console.log("getUserSentMessages: "+error);
            });
        };

        $scope.setView = function(newView) {
            if(newView == "received") {
                $scope.getReceivedMessages();
                $scope.currentViewText = "Odebrane wiadomości";
                $scope.currentView = "received";
            }
            else if(newView == "sent"){
                $scope.getSentMessages();
                $scope.currentViewText = "Wysłane wiadomości";
                $scope.currentView = "sent";
            }
            else if(newView == "send") {
                $('#sendMsgModal')
                    .modal('show');
            }
        };

        $scope.receiverDoesntExist = false;
        $scope.receiverAndAuthorAreTheSame = false;

        $scope.sendMsg = function() {
            delete $scope.sendMessage.title;    // TEMP
            Message.sendMessageByEmail($scope.sendMessage).then(function(response){
                if(response.data.result != true && response.data.status == 200) {
                    if(response.data.message=="Receiver doesn't exist") {
                        $scope.receiverDoesntExist = true;
                    } else if(response.data.message=="Receiver and author are the same") {
                        $scope.receiverAndAuthorAreTheSame = true;
                    }
                }
                else if(response.data.status == 200) {
                    $('#sendMsgModal')
                        .modal('hide');     // cos nie dziala, nie wiem jeszcze czemu
                    $scope.sendMessage = {};
                }
            });
        };
        
        $scope.showMsg = function(msgId, type) {
            if(type == 'received') {
                for (var i = 0; i < $scope.receivedMessages.length; i++) {
                    if ($scope.receivedMessages[i].id === msgId) {
                        $scope.viewMessage = $scope.receivedMessages[i];
                        break;
                    }
                }
            }
            else {
                for (i = 0; i < $scope.sentMessages.length; i++) {
                    if ($scope.sentMessages[i].id === msgId) {
                        $scope.viewMessage = $scope.sentMessages[i];
                        break;
                    }
                }
            }
            $('#viewMsgModal')
                .modal('show');
        };

        $scope.sendMessage = {};
        $scope.viewMessage = {};
        $scope.getReceivedMessages();
        $scope.currentView = "received";
        $scope.currentViewText = "Odebrane wiadomości";

    }]);