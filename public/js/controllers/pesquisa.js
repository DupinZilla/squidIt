var instagram = angular.module('instagram');

instagram.controller('pesquisaController', function ($scope, $http,API) {

    $scope.pesquisa = function () {
        API.getFotos($scope.hashtag).then(function (response) {
            $scope.objetos = response.data;
        }, function (err) {
            console.log("erro: " + err)
        });
    }
});