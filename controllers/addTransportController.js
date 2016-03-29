var addTransportController = angular.module('addTransportController', []);
addTransportController.controller('AddTransportController', ['$scope', '$location',
    function ($scope, $location) {
        $('.ui.dropdown').dropdown({
            fields: { name: "name", value: "id" },
            apiSettings: {
                url: './fixedObject/cities.json/{query}'
            }
        });

        $('#transport-packtypes').dropdown({
            fields: { name: "type", value: "id" },
            apiSettings: {
                url: './fixedObject/pack-types.json/{query}'
            }
        });

        $('.ui.form')
            .form({
                fields: {
                    title: {
                        identifier: 'transport-title',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Proszę wprowadzić tytuł ogłoszenia'
                            }
                        ]
                    },
                    start: {
                        identifier: 'transport-start',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Proszę wybrać lokację początkową'
                            }
                        ]
                    },
                    end: {
                        identifier: 'transport-end',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Proszę wybrać lokację końcową'
                            }
                        ]
                    },
                    through: {
                        identifier: 'transport-through'
                    },
                    packtypes: {
                        identifier: 'transport-packtypes',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Proszę wybrać rodzaje transportowanych paczek'
                            }
                        ]
                    },
                    description: {
                        identifier: 'transport-description',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Proszę wprowadzić opis ogłoszenia'
                            }
                        ]
                    }
                }
            });
        $('form').api({
            url: './fixedObject/addedTransports.json',
            action: 'addtransport',
            method: 'post',
            serializeForm: true,
            dataType: 'text',
            onSuccess: function() {
                // to do - switch view to transportid
            },
            onError: function() {
                alert('Wystąpił błąd połączenia z serwerem');
            }
        });
    }]);