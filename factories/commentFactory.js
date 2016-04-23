var commentFactory = angular.module('commentFactory', []);
commentFactory.factory('Comment', ['$http', 'Urls',
    function ($http, Urls){
        var Comment = {};

        Comment.addComment = function (comment) {
            return $http.post(Urls.Base+'comments', comment);
        };

        Comment.replyToComment = function (replyComment) {
            return $http.post(Urls.Base+'comments/response', replyComment);
        };

        return Comment;
    }]);