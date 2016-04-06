var accountFactory = angular.module('accountFactory', []);
accountFactory.factory('Account', ['$http', 'Urls', '$localStorage',
    function ($http, Urls, $localStorage){
        var Account = {};
        var url = 'http://192.168.0.101:8080/';

        Account.logIn = function (email, password) {
            var req = {
                method: 'POST',
                url: Urls.Base+'login',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: "username="+email+"&"+"password="+password
            };
            return $http(req);
        };
        Account.logOut = function(){
            return $http.get(Urls.Base+'logout');
            delete $localStorage.token;
        }
        Account.register = function (user) {
            return $http.post(Urls.Base+'users', user);
        }
        Account.getCurrentUser = function () {
            return $http.get(Urls.Base+'users');
        }

        return Account;
    }]);