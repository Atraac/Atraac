var citiesFactory = angular.module('citiesFactory', []);
citiesFactory.factory('Cities', ['$http', 'Urls',
    function ($http, Urls) {
        var Cities = {};

        Cities.getCities = function() {
            return $http.get(Urls.Base+'cities');
        };

        return Cities;
    }]);