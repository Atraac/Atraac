var userFactory = angular.module('userFactory', []);
userFactory.factory('User', ['$http', 'Urls',
    function ($http, Urls){
    var User = {};

    User.getUser = function(userId){
        return $http.get(Urls.Base+"users/"+userId);
    };

    User.editUser = function(editUser){
        return $http.put(Urls.Base+"users",editUser);
    };

    User.getNotifications = function(){
        return $http.get(Urls.Base+"users/notifications");
    };

    User.deleteNotification = function(notificationId){
        return $http.delete(Urls.Base+"users/notifications/"+notificationId);
    };

    return User;
}]);