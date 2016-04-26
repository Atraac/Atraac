var searchTransportController = angular.module('searchTransportController', ['transportFactory', 'citiesFactory', 'preferencesFactory']);

searchTransportController.controller('SearchTransportController', ['$scope', 'Urls', 'Transport', 'Cities', 'Preferences', '$http', '$rootScope',
    function ($scope, Urls, Transport, Cities, Preferences) {
        $scope.preferencesLoaded = false;
        $scope.citiesLoaded = false;

        Cities.getCities().then(function (response) {
            if(response.status == 200) {
                $scope.cities = response.data.cities;
                $scope.citiesLoaded = true;
            }
            else {
                alert("Wystąpił problem połączenia z serwerem")
            }
        }, function (error) {
            console.log(error);
        });

        Preferences.getPreferences().then(function (response) {
            if (response.status == 200) {
                $scope.preferences = response.data.preferences;
                $scope.preferencesLoaded = true;
            }
            else {
                alert("Wystąpił problem połączenia z serwerem")
            }
        }, function (error) {
            console.log(error);
        });

        $scope.selection = [];

        $scope.toggleSelection = function toggleSelection(preference) {
            var idx = $scope.selection.indexOf(preference);

            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            else {
                $scope.selection.push(preference);
            }
        };

        $('#departureDate').on('apply.daterangepicker', function(ev, picker) {
        }).daterangepicker(
            {
                singleDatePicker : true,
                showDropdowns : true,
                format : "MM-DD-YYYY",
                locale: {
                    applyLabel: 'Wybierz',
                    cancelLabel: 'Wyczyść',
                    fromLabel: 'Od',
                    toLabel: 'Do',
                    daysOfWeek: ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
                    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                    firstDay: 1
                }
            }
        );

        $scope.searchTransport = {
            preferences : $scope.selection
        };


        $scope.searchResults = false;
        $scope.searchNotFound = false;

        $scope.quantityTransports = 0;

        $scope.resultsPerPage = 5;

        $scope.sortBy = document.getElementById('sortBy');
        $scope.sortBy.value = "BYDATEASC";
        $scope.sortBy.onchange = function() {$scope.onSearch()};
        $scope.missedSelection = false;
        $scope.getTransportsError = false;

        $scope.onSearch = function() {
            if($scope.selection.length > 0){
                $scope.missedSelection = false;
                $scope.searchTransport.preferences = $scope.selection;
                $scope.searchTransport.date = new Date($scope.departureDate);
                $scope.searchTransport.offset = 0;
                $scope.searchTransport.limit = $scope.resultsPerPage;
                $scope.searchTransport.transportsSearchOrder = $scope.sortBy.value;
                $scope.pageNumber = 1;
                Transport.getTransports($scope.searchTransport).then(function(response){
                    if (response.status == 200) {
                        $scope.transports = response.data.transports;
                        $scope.quantityTransports = response.data.quantityTransports;
                        $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                        if($scope.quantityTransports > 0) {
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
                }, function (error) {
                    $scope.getTransportsError = true;
                });
            }
            else {
                $scope.missedSelection = true;
            }
        };

        $scope.searchNext = function() {
            if ( $scope.pageNumber < $scope.totalPages) {
                $scope.searchTransport.offset = $scope.pageNumber * $scope.resultsPerPage + 1;

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        $scope.transports = response.data.transports;
                        $scope.quantityTransports = response.data.quantityTransports;

                        $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                        $scope.pageNumber++;
                        if($scope.quantityTransports > 0) {
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
            if ($scope.pageNumber > 1) {
                $scope.searchTransport.offset = ($scope.pageNumber - 2) * $scope.resultsPerPage + 1;

                Transport.getTransports($scope.searchTransport, $scope.sortBy.value).then(function(response){
                    if (response.status == 200) {
                        $scope.transports = response.data.transports;
                        $scope.quantityTransports = response.data.quantityTransports;
                        $scope.totalPages = Math.ceil($scope.quantityTransports / $scope.resultsPerPage);
                        $scope.pageNumber--;
                        if($scope.quantityTransports > 0) {
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