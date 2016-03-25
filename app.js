var deliverIT = angular.module('deliverIT',
        ['ngRoute',
        'greetingController', 'myProfileController', 'searchTransportController', 'addTransportController','myMessagesController',
        'myPackagesController', 'myTransportsController']);
deliverIT.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: './views/greeting.html',
        controller: 'GreetingController'
    }).
    when('/search-transport', {
        templateUrl: './views/search-transport.html',
        controller: 'SearchTransportController'
    }).
    when('/my-profile', {
        templateUrl: './views/my-profile.html',
        controller: 'MyProfileController'
    }).
    when('/add-transport', {
        templateUrl: './views/add-transport.html',
        controller: 'AddTransportController'
    }).
    when('/my-packages', {
        templateUrl: './views/my-packages.html',
        controller: 'MyPackagesController'
    }).
    when('/my-transports', {
        templateUrl: './views/my-transports.html',
        controller: 'MyTransportsController'
    }).
    when('/my-messages', {
        templateUrl: './views/my-messages.html',
        controller: 'MyMessagesController'
    }).
    when('/edit-my-profile', {
        templateUrl: './views/edit-my-profile.html',
        controller: 'MyProfileController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

