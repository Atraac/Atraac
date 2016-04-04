var accountFactory = angular.module('accountFactory', []);
accountFactory.factory('Account', ['$http',
    function ($http){
        var Account = {};
        var url = 'http://192.168.0.101:8080/';

        Account.logIn = function (email, password) {
            var req = {
                method: 'POST',
                url: url+'login',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: "username="+email+"&"+"password="+password
            };
            return $http(req);
        };
        Account.logOut = function(){
            return $http.get(url+'logout');
        }
        Account.register = function (user) {
            return $http.post(url+'users', user);
        }
        Account.getCurrentUser = function () {
            return $http.get(url+'users');
        }

        return Account;
    }]);