var instagram = angular.module('instagram', ['ngRoute']);

instagram.config(["$routeProvider", function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'views/pesquisa.html',
            controller: 'pesquisaController'
        })

        // route for the about page
        .when('/lista', {
            templateUrl: 'views/lista.html',
            controller: 'listaController'
        })
        .when('/tag', {
            templateUrl: 'views/visualizar.html',
            controller: 'visualizaController'
        })
}]);

instagram.service('API', ["$http", function ($http) {
    var _API = "http://localhost:3000/";
    var getFotoByID = function (id) {
        return $http.get(_API + "api/instagram/fotos/" + id);
    }
    var removerHashTag = function (_id) {
        return $http.delete(_API + "api/instagram/fotos/" + _id);
    }
    var getHashTags = function(){
        return $http.get(_API + "api/instagram/fotos");
    }
    var getFotos = function(hashtag){
        return $http.get(_API + "api/instagram/instatags?q=" + hashtag);
    }
    return {
        getFotoByID: getFotoByID,
        removerHashTag:removerHashTag,
        getHashTags:getHashTags,
        getFotos:getFotos
    };
}]);
var instagram = angular.module('instagram');
var _API = "http://localhost:3000/";

instagram.controller('pesquisaController', ["$scope", "$http", function ($scope, $http) {
    $scope.pesquisa = function () {
        $http.get(_API + "api/instagram/instatags?q=" + $scope.hashtag)
            .then(function (response) {
                console.log(response);
                $scope.objetos = response.data;
            }).catch(function (err) {
                console.log(err);
            });
    }
}]);


instagram.controller('listaController', ["$scope", "$http", "$location", function ($scope, $http, $location) {
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
}]);


instagram.controller('visualizaController', ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $http.get(_API + "/api/instagram/fotos/" + $location.search()._id)
        .then(function (response) {
            $scope.fotos = response.data.image;
            console.log($scope.fotos);
        }).catch(function (err) {
            console.log(err);
        });
}]);

var instagram = angular.module('instagram');
instagram.controller('listaController', ["$scope", "$http", "$location", "API", function ($scope, $http, $location, API) {

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
}]);

angular.module('login', [])
    .controller('LoginController', ["$scope", "$http", function ($scope, $http) {

        $scope.autentica = function () {
            $http.get("http://localhost:3000/api/instagram")
                .then(function (response) {
                   window.location.replace(response.data.url);
                }).catch(function (err) {
                    console.log(err);
                });
        }

    }]);
var instagram = angular.module('instagram');

instagram.controller('pesquisaController', ["$scope", "$http", "API", function ($scope, $http,API) {

    $scope.pesquisa = function () {
        API.getFotos($scope.hashtag).then(function (response) {
            $scope.objetos = response.data;
        }, function (err) {
            console.log("erro: " + err)
        });
    }
}]);
var instagram = angular.module('instagram');

instagram.controller('visualizaController', ["$scope", "$http", "$location", "API", function ($scope, $http, $location, API) {
    API.getFotoByID($location.search()._id).then(function (response) {
        console.log(response.data.image);
        $scope.fotos = response.data.image;
    },function(err){
        console.log("erro: " + err);
    });
}]);
