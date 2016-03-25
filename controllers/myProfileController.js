var myProfileController = angular.module('myProfileController', ['ngResource']);
myProfileController.controller('MyProfileController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'MyProfileController';
        User.getUser(function (data) {
            $scope.User = data;
        });
    }]);

myProfileController.factory('User', ['$resource', function ($resource){
    return $resource('./fixedObject/user-profile.json', {},
            {getUser: {method:'GET', isArray: false}})
}]);