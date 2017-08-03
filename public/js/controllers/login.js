angular.module('login', [])
    .controller('LoginController', function ($scope, $http) {

        $scope.autentica = function () {
            $http.get("http://localhost:3000/api/instagram")
                .then(function (response) {
                   window.location.replace(response.data.url);
                }).catch(function (err) {
                    console.log(err);
                });
        }

    });