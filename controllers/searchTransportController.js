var searchTransportController = angular.module('searchTransportController', ['transportFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Urls', 'Transport', '$http', '$rootScope',
    function ($scope, Urls, Transport, $http, $rootScope) {

        $http.get(Urls.Base+'cities')
            .then(function (response)
            {
                $scope.cities = response.data.cities;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

        $scope.order = 'departureDate';
        $scope.reverse = false;
        $scope.changeOrder = function(order){
            $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
            $scope.order = order;
        };

        $scope.searchTransport = {
            userId : $rootScope.loggedUser.id,
            preferences : $scope.selection
        };


        $scope.searchResults = false; // ng-show var to control search results table

        $scope.quantityTransport = 0;   // # of results for a search in DB to print

        $scope.resultsPerPage = 5; // maybe option to change in the future

        $scope.sortBy = document.getElementById('sortBy');  // get sorting dropdown
        $scope.sortBy.value = "bydateasc";  // set default sorting to date - ascending
        $scope.sortBy.onchange = function() {$scope.onSearch()};

        // search submit function
        $scope.onSearch = function() {
            $scope.searchTransport.preferences = $scope.selection;  // add preferences
            $scope.searchTransport.offset = 0;  // get first set of results
            $scope.searchTransport.limit = $scope.resultsPerPage;  // number of results per page
            $scope.pageNumber = 1;  // reset page number for new search

            Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                if (response.status == 200) {
                    // set table content to received data
                    $scope.transports = response.data.transports;
                    $scope.quantityTransport = response.data.quantityTransport;
                    // show results table if search successfull
                    $scope.pageNumber = 1;
                    $scope.totalPages = Math.round($scope.quantityTransport / $scope.resultsPerPage) + 1;
                    $scope.searchResults = true;
                }
                else {
                    $scope.searchResults = false;
                    alert("Connection problem!");
                }
            });

        };

        $scope.searchNext = function() {
            // if next page would exceed number of records in DB, then do nothing
            if ($scope.pageNumber * $scope.resultsPerPage + 1 > $scope.quantityTransport) {

            }
            // else switch to next page and refresh results
            else {
                $scope.pageNumber +=1;  // switch to the next results page
                $scope.searchTransport.offset = $scope.pageNumber * $scope.resultsPerPage + 1;  // get NEXT set of results

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        // set table content to received data
                        $scope.transports = response.data.transports;   // refresh the data
                        $scope.quantityTransport = response.data.quantityTransport; // refresh number of transports in DB
                        // show results table if search successfull
                        $scope.totalPages = Math.round($scope.quantityTransport / $scope.resultsPerPage) + 1;
                        $scope.searchResults = true;
                    }
                    else {
                        $scope.searchResults = false;
                        $scope.pageNumber -=1;  // fix page number
                        alert("Connection problem!");
                    }
                });
            }
        };
        $scope.searchPrevious = function() {
            // if next page would exceed number of records in DB, then do nothing
            if ($scope.pageNumber == 1) {

            }
            // else switch to next page and refresh results
            else {
                $scope.pageNumber -=1;  // switch to the next results page
                $scope.searchTransport.offset = $scope.pageNumber * $scope.resultsPerPage + 1;  // get NEXT set of results

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        // set table content to received data
                        $scope.transports = response.data.transports;   // refresh the data
                        $scope.quantityTransport = response.data.quantityTransport; // refresh number of transports in DB
                        // show results table if search successfull
                        $scope.totalPages = Math.round($scope.quantityTransport / $scope.resultsPerPage) + 1;
                        $scope.searchResults = true;
                    }
                    else {
                        $scope.pageNumber +=1;  // fix page number
                        alert("Connection problem!");
                    }
                });
            }
        };

        // checkbox control
        $http.get(Urls.Base+'preferences')
            .then(function (response)
            {
                $scope.preferences = response.data.preferences;
            }, function (error) {
                $scope.error1 = JSON.stringify(error);
            });

        // selected preferences
        $scope.selection = [];

        // toggle selection for a given packtype by name
        $scope.toggleSelection = function toggleSelection(preference) {
            var idx = $scope.selection.indexOf(preference.name);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection.push(preference);
            }
        };
    }]);