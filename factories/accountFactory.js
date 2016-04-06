var accountFactory = angular.module('accountFactory', []);
accountFactory.factory('Account', ['$http', 'Urls', '$localStorage', '$window',
    function ($http, Urls, $localStorage, $window){
        var Account = {};
        var url = 'http://192.168.0.101:8080/';

        Account.logIn = function (email, password) {
            $window.localStorage.clear();
            var req = {
                method: 'POST',
                url: Urls.Base+'login',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: "username="+email+"&"+"password="+password
            };
            return $http(req);
        };
        Account.logOut = function(){
            $window.localStorage.clear();
        };
        Account.register = function (user) {
            return $http.post(Urls.Base+'users', user);
        };
        Account.getCurrentUser = function () {
            return $http.get(Urls.Base+'users');
        };

        return Account;
    }]);