var commentFactory = angular.module('commentFactory', []);
commentFactory.factory('Comment', ['$http', 'Urls',
    function ($http, Urls){
        var Comment = {};


        return Comment;
    }]);