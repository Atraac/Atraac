var greetingController = angular.module('greetingController', []);
greetingController.controller('GreetingController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        console.log($rootScope.userId +"\n" + $rootScope.login);
        // ukryj gdy zalogowany
        document.getElementsByClassName("loggedin")[0].style.display = 'none';
    }]);