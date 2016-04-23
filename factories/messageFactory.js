var messageFactory = angular.module('messageFactory', []);
messageFactory.factory('Message', ['$http', 'Urls',
    function ($http, Urls){
        var Messages = {};

        Messages.getUserReceivedMessages = function(){
            return $http.get(Urls.Base+"/users/recievedMessages"); // literowke poprawia
        };

        Messages.getUserSentMessages = function(){
            return $http.get(Urls.Base+"/users/sendededMessages"); // literowke poprawia
        };

        Messages.sendMessageByEmail = function(message){
            return $http.post(Urls.Base+"/users/messagebyemail", message);
        };

        Messages.sendMessageById = function(message){
            return $http.post(Urls.Base+"/users/messagebyid", message);
        };
        
        return Messages;
    }]);