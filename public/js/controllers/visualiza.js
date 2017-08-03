var instagram = angular.module('instagram');

instagram.controller('visualizaController', function ($scope, $http, $location, API) {
    API.getFotoByID($location.search()._id).then(function (response) {
        console.log(response.data.image);
        $scope.fotos = response.data.image;
    },function(err){
        console.log("erro: " + err);
    });
});
