/**
 * question.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: question.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').controller('testController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    $scope.checkvalidity = function() {
        // Submit request to Sails.
        console.log('---------token---------', $routeParams.token);
        $http.post('/test', {
                token: $routeParams.token
            })
            .then(function onSuccess(sailsResponse) {
                window.location = '#/testpage';
            })
    }
}]);