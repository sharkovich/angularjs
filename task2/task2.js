var app = angular.module('myApp')

    .controller('task2Controller', function ($scope) {
        // Nie jest to poprawne. Nie możemy w taki sposób zadeklarować propercji w objeckie ($scope w tym przypadku)
        // bez definicji. Musimy zainicjalizowąć jakąś wartość.
        $scope.ibanString = '';
        //

        $scope.ibanString2 = '';

        $scope.onlyNumbers = /^\d+$/;
        $scope.iban = {};
        $scope.ibanValid = function (arg) {
            $scope.isValid = arg;
        }
    })

    .directive('ibanValid', function () {
        return {
            // Powinien być tylko 'A', gdyż ngModel wymaka elementu typu input, textarea itp., wiec nie możemy
            // utworzyć elementu o tagu <iban-valid> w tym wypadku
            restrict: 'EA',
            require: 'ngModel',
            // Tworzenie izolowanego scope dla dyrektywy ktora ma tylko walidować może doprowadzić do problemów, np.
            // gdy takich dyrekryw walidujących będziemy chcieli dołączyć kilka do jednego pola.
            scope: {
                //Jeżeli robimy dyrektywę wymagającą kontroller ngModel, nie musimy, a wrecz nie powinniśmy przekazywać
                //modelu do scope
                'iban': '=',
                'fromDirectiveFn': '=method'
            },
            link: function (scope, element, attrs, ngModel) {

                //Powinno się użyć wbudowanych, angularowych walidatorów
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
    });

//Propozycja rozwiązania:

//Mockujemy funkcje validateIban na potrzeby prezentacji
function validateIban(iban) {
    return (new RegExp(/^\d{26}/)).test(iban);
}


app.directive('ibanValidExample', ibanValidExampleDirective);

ibanValidExampleDirective.$inject = [];

function ibanValidExampleDirective() {
    function linkFn(scope, element, attrs, ngModel) {
        ngModel.$validators.iban = function ibanValidator(modelValue, viewValue) {
            const iban = modelValue || viewValue;
            return validateIban(iban);
        }
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: linkFn,
    };
}


