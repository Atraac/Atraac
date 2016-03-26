var greetingController = angular.module('greetingController', []);
greetingController.controller('GreetingController', ['$scope',
    function ($scope) {
        // ukryj gdy zalogowany
        document.getElementsByClassName("loggedin")[0].style.display = 'none';
    }]);