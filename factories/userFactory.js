var userFactory = angular.module('userFactory', []);
userFactory.factory('User', ['$http', 'Urls',
    function ($http, Urls){
    var User = {};

    User.getUser = function(userId){
        return $http.get(Urls.Base+"users/"+userId);
    };

    return User;
}]);