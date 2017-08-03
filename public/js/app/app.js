var instagram = angular.module('instagram', ['ngRoute']);

instagram.config(function ($routeProvider) {
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
});

instagram.service('API', function ($http) {
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
});