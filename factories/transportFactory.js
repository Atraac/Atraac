var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', 'Urls',
    function ($http, Urls){
        var Transport = {};

        Transport.getTransports = function(searchTransport, sortby) {
            return $http.post(Urls.Base+'transports/bydate', searchTransport);  // defaulted to /bydate for now
            //return $http.get('./fixedObject/transports.json/');
        };
        Transport.addTransport = function(transport) {
            return $http.post(Urls.Base+'transports', transport);
        };

        return Transport;
    }]);