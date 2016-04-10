var searchTransportController = angular.module('searchTransportController', ['transportFactory', 'citiesFactory', 'preferencesFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Urls', 'Transport', 'Cities', 'Preferences', '$http', '$rootScope',
    function ($scope, Urls, Transport, Cities, Preferences, $http, $rootScope) {

        // fill dropdowns with cities
        Cities.getCities().then(function (response) {
            $scope.cities = response.data.cities;
        });


        // checkbox control
        // fill checkboxees with preferences
        Preferences.getPreferences().then(function (response) {
            $scope.preferences = response.data.preferences;
        });

        // selected preferences
        $scope.selection = [];

        // toggle selection for a given packtype by name
        $scope.toggleSelection = function toggleSelection(preference) {
            var idx = $scope.selection.indexOf(preference);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection.push(preference);
            }
        };

        // init of searchTransport - object used to find transports like this one
        $scope.searchTransport = {
            userId : $rootScope.loggedUser.id,
            preferences : $scope.selection
        };


        $scope.searchResults = false; // ng-show var to control search results table
        $scope.searchNotFound = false; // ng-show var to show 404 error when no search results were found

        $scope.quantityTransports = 0;   // # of results for a search in DB to print

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
                    $scope.quantityTransports = response.data.quantityTransports;
                    $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                    if($scope.quantityTransports > 0) { // if found any results
                        $scope.searchResults = true;
                        $scope.searchNotFound = false;
                    }
                    else {
                        $scope.searchResults = false;
                        $scope.searchNotFound = true;
                    }
                }
                else {
                    $scope.searchResults = false;
                    alert("Connection problem!");
                }
            });

        };

        $scope.searchNext = function() {
            // if next page exists in DB with given offset/resultsNumber
            if ( $scope.pageNumber < $scope.totalPages) {
                $scope.searchTransport.offset = $scope.pageNumber * $scope.resultsPerPage + 1;  // get NEXT set of results

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        $scope.transports = response.data.transports;   // refresh the data
                        $scope.quantityTransports = response.data.quantityTransports; // refresh number of transports in DB
                        // show results table if search successfull
                        $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                        $scope.pageNumber++;  // switch to the next results page
                        if($scope.quantityTransports > 0) { // if found any results
                            $scope.searchResults = true;
                            $scope.searchNotFound = false;
                        }
                        else {
                            $scope.searchResults = false;
                            $scope.searchNotFound = true;
                        }
                    }
                    else {
                        $scope.searchResults = false;
                        alert("Connection problem!");
                    }
                });
            }
        };
        $scope.searchPrevious = function() {
            // if we're not on first page then
            if ($scope.pageNumber > 1) {
                $scope.searchTransport.offset = ($scope.pageNumber - 2) * $scope.resultsPerPage + 1;  // get PREVIOUS set of results

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        $scope.transports = response.data.transports;   // refresh the data
                        $scope.quantityTransports = response.data.quantityTransports; // refresh number of transports in DB
                        // show results table if search successfull
                        $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                        $scope.pageNumber--;  // switch to the previous results page
                        if($scope.quantityTransports > 0) { // if found any results
                            $scope.searchResults = true;
                            $scope.searchNotFound = false;
                        }
                        else {
                            $scope.searchResults = false;
                            $scope.searchNotFound = true;
                        }
                    }
                    else {
                        $scope.searchResults = false;
                        alert("Connection problem!");
                    }
                });
            }
        };
    }]);