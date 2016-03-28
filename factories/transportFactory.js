var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', function ($http){
    return{
        getTransport: function() {
            return $http.get('./fixedObject/transport.json');
        }
    }
}]);