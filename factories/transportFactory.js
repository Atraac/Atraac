var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', 'Urls',
    function ($http, Urls){
        var Transport = {};

        Transport.getTransports = function(searchTransport, sortby) {
            return $http.post(Urls.Base+'transports/bydate', searchTransport);  // defaulted to /bydate for now
        };
        Transport.addTransport = function(transport) {
            return $http.post(Urls.Base+'transports', transport);
        };

        Transport.getTransport = function(transportId) {
            return $http.get(Urls.Base+'transports/'+transportId);
        };

        Transport.getDriverTransports = function(userId) {
            return $http.get(Urls.Base+'transports/'+userId);
        };

        return Transport;
    }]);