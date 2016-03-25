var myProfileController = angular.module('myProfileController', ['ngResource']);
myProfileController.controller('MyProfileController', ['$scope', 'User',
    function ($scope, User) {
        $scope.something = 'MyProfileController';
        User.getUser().then(function (response) {
            $scope.User = response.data;
            $scope.User.birthdate = new Date(response.data.birthdate);
        })
        $scope.onEdit = function(){
            console.log($scope.User);
        }
    }]);

myProfileController.factory('User', ['$resource','$http', function ($resource, $http){
    //var data = $resource('./fixedObject/user-profile.json', {});
    //return data;
    return{
        getUser: function() {
            return $http.get('./fixedObject/user-profile.json');
    }
}}]);