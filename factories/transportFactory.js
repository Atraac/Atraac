var transportFactory = angular.module('transportFactory', []);
transportFactory.factory('Transport', ['$http', 'Urls',
    function ($http, Urls){
        var Transport = {};

        Transport.getTransports = function(searchTransport) {
            return $http.post(Urls.Base+'transports/filtered', searchTransport);
        };
        Transport.addTransport = function(transport) {
            return $http.post(Urls.Base+'transports', transport);
        };

        Transport.getTransport = function(transportId) {
            return $http.get(Urls.Base+'transports/'+transportId);
        };

        Transport.getDriverTransports = function() {
            return $http.get(Urls.Base+'users/transports');
        };

        Transport.changeTransportState = function(transportId, state){
            return $http.put(Urls.Base+'transports/'+transportId+'/state', state);
        };

        return Transport;
    }]);