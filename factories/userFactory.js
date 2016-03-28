var userFactory = angular.module('userFactory', []);
userFactory.factory('User', ['$http',
    function ($http){
    return{
        getUser: function() {
            return $http.get('./fixedObject/user-profile.json');
        }
    }
}]);