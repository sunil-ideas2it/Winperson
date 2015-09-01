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
        $http.post('/test', {
                token: $routeParams.token
            })
            .then(function onSuccess(sailsResponse) {
            	$scope.user = sailsResponse.data;
                window.location = '#/applicantsignup/'+$routeParams.token;
            })
            .catch(function onError(sailsResponse) {
            	 
            	 if (sailsResponse.status === 400 || 404) {
                    // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
                    //
                     res.status(400).send('Something broke!');
                }
                // Handle known error type(s).
                // If using sails-disk adpater -- Handle Duplicate Key
            })
    }
    $scope.submitApplicantSignupForm = function() {
         console.log('--------------in ang controller--------');
        // Submit request to Sails.
        $http.post('/applicantsignup', {
                token: $routeParams.token,
                password: $scope.signupForm.password,
                firstname: $scope.signupForm.firstname,
                lastname: $scope.signupForm.lastname
            })
            .then(function onSuccess(sailsResponse) {
                window.location = '/';
            })
            .catch(function onError(sailsResponse) {

            })
           
    };
}]);