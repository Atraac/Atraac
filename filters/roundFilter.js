angular.module('roundFilter', []).
filter('round', function() {
    return function(input) {
        return Math.round(input);
    };
});