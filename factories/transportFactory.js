var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', 'Urls',
    function ($http, Urls){
        var Transport = {};

        Transport.getTransports = function(searchTransport) {
            return $http.get(Urls.Base+'transports', searchTransport);
        };
        Transport.addTransport = function(transport) {
            return $http.post(Urls.Base+'transports', transport);
        };

        return Transport;
    }]);