var instagram=angular.module("instagram",["ngRoute"]);instagram.config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/pesquisa.html",controller:"pesquisaController"}).when("/lista",{templateUrl:"views/lista.html",controller:"listaController"}).when("/tag",{templateUrl:"views/visualizar.html",controller:"visualizaController"})}]),instagram.service("API",["$http",function(t){var o="http://localhost:3000/";return{getFotoByID:function(n){return t.get(o+"api/instagram/fotos/"+n)},removerHashTag:function(n){return t.delete(o+"api/instagram/fotos/"+n)},getHashTags:function(){return t.get(o+"api/instagram/fotos")},getFotos:function(n){return t.get(o+"api/instagram/instatags?q="+n)}}}]);var _API="http://localhost:3000/";(instagram=angular.module("instagram")).controller("pesquisaController",["$scope","$http",function(t,o){t.pesquisa=function(){o.get(_API+"api/instagram/instatags?q="+t.hashtag).then(function(o){console.log(o),t.objetos=o.data}).catch(function(t){console.log(t)})}}]),instagram.controller("listaController",["$scope","$http","$location",function(t,o,n){function a(){o.get(_API+"api/instagram/fotos").then(function(o){t.tags=o.data,console.log(t.tags)}).catch(function(t){console.log(t)})}t.go=function(t){n.path("tag").search("_id",t)},t.remover=function(t){o.delete(_API+"api/instagram/fotos/"+t).then(function(t){console.log(t),a()}).catch(function(t){console.log(t)})},a()}]),instagram.controller("visualizaController",["$scope","$http","$location",function(t,o,n){o.get(_API+"/api/instagram/fotos/"+n.search()._id).then(function(o){t.fotos=o.data.image,console.log(t.fotos)}).catch(function(t){console.log(t)})}]),(instagram=angular.module("instagram")).controller("listaController",["$scope","$http","$location","API",function(t,o,n,a){function e(){a.getHashTags().then(function(o){t.tags=o.data},function(t){console.log("erro: "+t)})}t.go=function(t){n.path("tag").search("_id",t)},t.remover=function(t){a.removerHashTag(t).then(function(){e()},function(t){console.log("erro: "+t)})},e()}]),angular.module("login",[]).controller("LoginController",["$scope","$http",function(t,o){t.autentica=function(){o.get("http://localhost:3000/api/instagram").then(function(t){window.location.replace(t.data.url)}).catch(function(t){console.log(t)})}}]),(instagram=angular.module("instagram")).controller("pesquisaController",["$scope","$http","API",function(t,o,n){t.pesquisa=function(){n.getFotos(t.hashtag).then(function(o){t.objetos=o.data},function(t){console.log("erro: "+t)})}}]),(instagram=angular.module("instagram")).controller("visualizaController",["$scope","$http","$location","API",function(t,o,n,a){a.getFotoByID(n.search()._id).then(function(o){console.log(o.data.image),t.fotos=o.data.image},function(t){console.log("erro: "+t)})}]);