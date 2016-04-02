var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', ['$scope',
    function ($scope) {
        $('.ui.dropdown').dropdown({
            fields: { name: "name", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json/{query}'
            }
        });

        $('#packtypes').dropdown({
            fields: { name: "type", value: "id" },
            apiSettings: {
                url: './fixedObject/pack-types.json/{query}'
            }
        });

        $('.ui.form')
            .form({
                fields: {
                    title: {
                        identifier: 'title',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Wymagany jest tytuł ogłoszenia'
                            }
                        ]
                    },
                    date: {
                        identifier: 'date',
                        rules: [
                            {
                                type : 'empty',
                                prompt : 'Wymagana jest data wyjazdu'
                            }
                        ]

                    },
                    point0: {
                        identifier: 'point0',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Wymagana jest lokacja początkowa'
                            }
                        ]
                    },
                    point1: {
                        identifier: 'point1'
                    },
                    point2: {
                        identifier: 'point2'
                    },
                    point3: {
                        identifier: 'point3'
                    },
                    point4: {
                        identifier: 'point4'
                    },
                    point5: {
                        identifier: 'point5'
                    },
                    point6: {
                        identifier: 'point6'
                    },
                    point7: {
                        identifier: 'point7',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Wymagana jest lokacja docelowa'
                            }
                        ]
                    },
                    packtypes: {
                        identifier: 'packtypes',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Wymagany jest co najmniej jeden rodzaj transportowanych paczek'
                            }
                        ]
                    },
                    description: {
                        identifier: 'description',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Wymagany jest opis ogłoszenia'
                            }
                        ]
                    }
                }
            });

        $('form').api({
            url: './fixedObject/transports.json',
            action: 'addtransport',
            method: 'post',
            serializeForm: true,
            dataType: 'text',
            beforeSend: function(settings) {
                // static user id = 1
                settings.data.idUser = 1;
            },
            onSuccess: function() {
            },
            onError: function() {
                alert('Wystąpił błąd połączenia z serwerem');
            }
        });

        $scope.points = 1;

        addPoint = function(num) {
            if (num > $scope.points) {
                $scope.points = num;
                $scope.$apply();
            }
        }
    }
]);