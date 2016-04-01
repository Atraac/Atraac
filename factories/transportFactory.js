var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', function ($http){
    return{
        getTransports: function() {
            return $http.get('./fixedObject/transports.json');
        },
        getUser: function() {
            return $http.get('./fixedObject/user-profile.json');
        }
    }
}]);