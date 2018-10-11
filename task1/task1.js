angular.module('myApp')

// dodana referencja do $q
    .controller('task1Controller', function ($scope, $q) {
        $scope.taxSymbols = [
            {value: {symbol: 'CIT'}},
            {value: {symbol: 'PIT'}},
            {value: {symbol: 'PIT24'}},
        ];
        $scope.searchTaxSymbols = function (phrase) {
            // W JSie powinniśmy porównywać używająć operatorów identycznośći ('===' oraz '!==')
            // nie jest to błąd, tylko dobra praktyka
            if (phrase != undefined && phrase != '()' && phrase != '') {
                symbols = (function () {
                    var output = [],
                        re = new RegExp(phrase, 'i'),
                        o,
                        symbol;
                    if ($scope.taxSymbols) {
                        angular.forEach($scope.taxSymbols, function (v) {
                            symbol = v.value.symbol;
                            if (re.test(symbol)) {
                                o = {
                                    value: symbol
                                };
                                output.push(o);
                            }
                        });
                        $scope.symbols = output;
                    }
                    //Jeżeli powyższy warunek nie zostanie spełniony, nie aktualizujemy $scope.symbols
                    return output;
                })();
            } else {
                $scope.symbols = [];
            }

            //Funkcja domyślnie była asynchroniczna i zwracała promise, w tym przypadku nie będzie ona kopatybilna
            //z istniejącym już kodem
        };


        //poniżej propozycja rozwiązania
        function searchTaxSymbols_example(phrase) {
            return $q((resolve) => {
                const symbols = $scope.taxSymbols || [];
                phrase = (phrase || '').toLowerCase();
                // programowanie funkcjonalne FTW!

                return resolve(
                    symbols
                        .filter((x) => {
                            // Nie potrzebny jest Regexp. Jest on wolniejszy od indexOf (niestety nie działa jsperf wieć nie mam
                            // jak udowodnić, musisz mi zaufac ;)), a poza tym trzeba pamietać o escapeowaniu znaków.
                            return (x.value.symbol)
                                .toLowerCase()
                                .indexOf(phrase) > -1;
                        })
                        .map(function (x) {
                            return {value: x.value.symbol};
                        })
                );
            });
        }

        //a tutaj przykładowa obsługa tej funkcji (zobacz gdzie użyta w HTMLu):
        $scope.onSearchBtnClick = function onSearchBtnClick(phrase) {
            searchTaxSymbols_example(phrase)
                .then((result) => {
                    $scope.symbols = result;
                });
        };

    });