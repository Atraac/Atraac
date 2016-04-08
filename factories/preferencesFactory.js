var preferencesFactory = angular.module('preferencesFactory', []);
preferencesFactory.factory('Preferences', ['$http', 'Urls',
    function ($http, Urls){
        var Preferences = {};

        Preferences.getPreferences = function() {
            return $http.get(Urls.Base+'preferences');
        };

        return Preferences;
    }]);