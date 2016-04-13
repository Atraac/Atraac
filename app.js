var deliverIT = angular.module('deliverIT',
        ['ngRoute', 'ngStorage',
        'greetingController', 'profileController', 'searchTransportController', 'addTransportController','myMessagesController', 'editProfileController',
        'myPackagesController', 'myTransportsController', 'loginController', 'registerController', 'menuController','showTransportController',
        'rating', 'roundFilter', 'accountFactory']);

deliverIT.run(function ($rootScope, $http, $window, $localStorage, Account) {
    $rootScope.loggedUser = {};
    $rootScope.logged = false;
    if($window.localStorage.getItem('X-CustomToken')!=null){
        $rootScope.logged = true;
        Account.getCurrentUser().then(function (response) {
            $rootScope.loggedUser = response.data;
        }, function(error){
            console.log("currentUserError: " + error);
        });
    }
});

deliverIT.constant('Urls', {
    Base : 'http://serverapi-deliverit.rhcloud.com/DeliverITServer/'
    //Base: 'http://192.168.0.101:8080/' //domowy Karola
    //Base : 'http://88.156.88.32:8080/'  //publiczny-domowy Karola
});

deliverIT.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$window', function ($q, $location, $localStorage, $window) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('X-CustomToken')) {
                    config.headers['X-CustomToken'] = $window.localStorage.getItem('X-CustomToken');
                    //config.headers.Authorization = 'X-CustomToken ' + $window.localStorage.getItem('X-CustomToken');
                }
                return config;
            },
            'responseError': function (response) {
                if ( response.status === 401 || response.status === 403 ) {
                    if ( ! $location.path().match('/search-transport.*') && ! $location.path().match('/show-transport.*') ) {
                        $location.path('/login');
                    }
                }
                return $q.reject(response);
            }
        };
    }]);

    $routeProvider.when('/', {
        templateUrl: './views/greeting.html',
        controller: 'GreetingController'
    }).
    when('/search-transport', {
        templateUrl: './views/search-transport.html',
        controller: 'SearchTransportController'
    }).
    when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
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
    when('/transports/:transportId', {
        templateUrl: './views/show-transport.html',
        controller: 'ShowTransportController'
    }).
    when('/my-messages', {
        templateUrl: './views/my-messages.html',
        controller: 'MyMessagesController'
    }).
    when('/edit-my-profile', {
        templateUrl: './views/edit-my-profile.html',
        controller: 'EditProfileController'
    }).
    when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController'
    }).
    when('/register', {
        templateUrl: './views/register.html',
        controller: 'RegisterController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

