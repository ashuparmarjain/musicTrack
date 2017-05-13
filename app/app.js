var app = angular.module('musicApp',["ngRoute","ui.bootstrap",'infinite-scroll','ngResource']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/views/home.html"
    })
    .when("/genres", {
        templateUrl : "app/views/genres.html"
    });
});
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)