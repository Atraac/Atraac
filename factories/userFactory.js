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

    return User;
}]);