var messageFactory = angular.module('messageFactory', []);
messageFactory.factory('Message', ['$http', 'Urls',
    function ($http, Urls){
        var Messages = {};

        Messages.getUserReceivedMessages = function(){
            return $http.get(Urls.Base+"users/receivedMessages");
        };

        Messages.getUserSentMessages = function(){
            return $http.get(Urls.Base+"users/sentMessages");
        };

        Messages.sendMessageByEmail = function(message){
            return $http.post(Urls.Base+"users/messagebyemail", message);
        };

        Messages.sendMessageById = function(message){
            return $http.post(Urls.Base+"users/messagebyid", message);
        };

        Messages.markAsRead = function(id) {
            return $http.put(Urls.Base+"/users/"+id+"/read");
        };

        return Messages;
    }]);