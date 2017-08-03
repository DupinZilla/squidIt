var instagram = angular.module('instagram');
var _API = "http://localhost:3000/";

instagram.controller('pesquisaController', function ($scope, $http) {
    $scope.pesquisa = function () {
        $http.get(_API + "api/instagram/instatags?q=" + $scope.hashtag)
            .then(function (response) {
                console.log(response);
                $scope.objetos = response.data;
            }).catch(function (err) {
                console.log(err);
            });
    }
});


instagram.controller('listaController', function ($scope, $http, $location) {
    function load() {
        $http.get(_API + "api/instagram/fotos")
            .then(function (response) {
                $scope.tags = response.data;
                console.log($scope.tags);
            }).catch(function (err) {
                console.log(err);
            });
    }

    $scope.go = function (path) {
        $location.path('tag').search('_id', path);
    };

    $scope.remover = function (_id) {
        $http.delete(_API + "api/instagram/fotos/" + _id)
            .then(function (response) {
                console.log(response);
                load();
            }).catch(function (err) {
                console.log(err);
            });
    }
    load();
});


instagram.controller('visualizaController', function ($scope, $http, $location) {
    $http.get(_API + "/api/instagram/fotos/" + $location.search()._id)
        .then(function (response) {
            $scope.fotos = response.data.image;
            console.log($scope.fotos);
        }).catch(function (err) {
            console.log(err);
        });
});
