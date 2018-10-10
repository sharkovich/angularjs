var app = angular.module('myApp')

    .controller('task2Controller', function ($scope) {
        $scope.ibanString;
        $scope.onlyNumbers = /^\d+$/;
        $scope.iban = {};
        $scope.ibanValid = function(arg) {        
            $scope.isValid = arg;
        }
    })

    .directive('ibanValid', function () {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                'iban': '=',
                'fromDirectiveFn': '=method'
            },
            link: function (scope, element, attrs, ngModel) {
                function validationIban(ibanString) {
                    if (ibanString != null) {
                        if (ngModel.$valid == true && ibanString.length == 26) {
                            scope.isValid = true;
                        } else {
                            scope.isValid = false;
                        }
                    } else {
                        scope.isValid = false;
                    }
                   
                   scope.fromDirectiveFn(scope.isValid);
                }
                // validationIban('12345678912345678900123456');
                // validationIban(false);
                // validationIban('1234');
                // validationIban(null);
                scope.iban.validationIban = validationIban;

            }
        };
    })

