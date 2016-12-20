var app = angular.module('myApp',['ngRoute']);

// MY CONTROLLER
app.controller('myCtrl', ['$scope', '$http', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {

$scope.name = 'Kevin';


}]);
