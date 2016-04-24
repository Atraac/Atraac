var myMessagesController = angular.module('myMessagesController', ['messageFactory']);

myMessagesController.controller('MyMessagesController', ['$scope', 'Message',
    function ($scope, Message) {

        $scope.getReceivedMessages = function() {
            Message.getUserReceivedMessages().then(function (response) {
                $scope.messages = response.data.receivedMessages;
                angular.forEach($scope.messages, function(eachObj) {
                    eachObj.title ='Tytuł odebranej wiadomości';
                })
            }, function (error) {
                console.log("getUserReceivedMessages: " + error);
            });
        };

        $scope.getSentMessages = function() {
            Message.getUserSentMessages().then(function (response) {
                $scope.messages = response.data.sentMessages;
                angular.forEach($scope.messages, function(eachObj) {
                    eachObj.title ='Tytuł wysłanej wiadomości';
                })
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
                if(response.data.result != true && response.status == 200) {
                    if(response.data.message ==="Receiver doesn't exist") {
                        $scope.receiverDoesntExist = true;
                    } else if(response.data.message ==="Receiver and author are the same") {
                        $scope.receiverAndAuthorAreTheSame = true;  // w api (/jeszcze) nie dziala mimo, ze tak napisali
                    }
                }
                else if(response.data.result == true && response.status == 200) {
                    if($scope.currentViewText === "Odebrane wiadomości") {
                        $scope.setView('received');
                    }
                    else {
                        $scope.setView('sent');
                    }

                    $('#sendMsgModal')
                        .modal('hide');

                    $scope.sendMessage = {};
                    $scope.sendMsgModalForm.$setPristine();
                    $scope.sendMsgModalForm.$setUntouched();
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
            console.log($scope.viewMessage.content);

            $('#viewMsgModal')
                .modal('show');
        };

        $scope.sendMessage = {};
        $scope.viewMessage = {};
        $scope.getReceivedMessages();
        $scope.currentViewText = "Odebrane wiadomości";

    }]);