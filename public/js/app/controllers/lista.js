var instagram = angular.module('instagram');
instagram.controller('listaController', function ($scope, $http, $location, API) {

    function load() {
        API.getHashTags().then(function (response) {
            $scope.tags = response.data;
        }, function (err) {
            console.log("erro: " + err);
        });
    }

    $scope.go = function (path) {
        $location.path('tag').search('_id', path);
    };

    $scope.remover = function (_id) {
        API.removerHashTag(_id).then(function () {
            load();
        }, function (err) {
            console.log("erro: " + err);
        });
    };
    load();
});
