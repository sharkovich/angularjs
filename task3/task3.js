angular.module('myApp')

    .controller('task3Controller', function ($scope, $http) {
        $http({
            method: "GET",
            url: "http://young-water-8859.getsandbox.com/transfers",
            data: '',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function mySuccess(response) {
            for(var i = 0; i < response.data.length; i++){
                var month = response.data[i].modificationTime.month;
                if(month < 10){
                   month = '0' + month;                  
                } 
                response.data[i].modificationTime.fullDay = response.data[i].modificationTime.day + '-' +  month + '-' +  response.data[i].modificationTime.year;
            }
            $scope.dataBankTransfers = response.data;
        });

        $scope.propertyName = 'amount';
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    });