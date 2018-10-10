angular.module('myApp')

    .controller('task1Controller', function ($scope) {
        $scope.taxSymbols = [
            { value: { symbol: 'CIT' } },
            { value: { symbol: 'PIT' } },
            { value: { symbol: 'PIT24' } },
        ];
        $scope.searchTaxSymbols = function (phrase) {
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
                    return output;
                })();
            } else {
                $scope.symbols = [];
            }
        };
    });