/**
 * signup.js
 *
 * @author      :: Sunil Hirole
 * @dated        : 27-08-2015
 * @description :: signup.js is a angular controller through which req are send to sails controller .
 */
angular.module('WinpersonApp').controller('signupController', ['$scope', '$http', 'toastr','$routeParams', function($scope, $http, toastr, $routeParams) {

    // set-up loading state
    $scope.signupForm = {
        loading: false
    }
    /*$scope.signupForm.password = '';
    $scope.$watch('signupForm.password', function() {
        $scope.signupForm.password = $scope.signupForm.password.replace(/\s+/g,'');
  });*/
    $scope.submitSignupForm = function() {
        // Set the loading state (i.e. show loading spinner)
        $scope.signupForm.loading = true;

        // Submit request to Sails.
        $http.post('/signup', {
                name: $scope.signupForm.name,
                email: $scope.signupForm.email,
                password: $scope.signupForm.password
            })
            .then(function onSuccess(sailsResponse) {
                window.location = '/';
            })
            .catch(function onError(sailsResponse) {

                // Handle known error type(s).
                // If using sails-disk adpater -- Handle Duplicate Key
                var emailAddressAlreadyInUse = sailsResponse.status == 409;

                if (emailAddressAlreadyInUse) {
                    toastr.error('That email address has already been taken, please try again.', 'Error');
                    return;
                }

            })
            .finally(function eitherWay() {
                $scope.signupForm.loading = false;
            })
    };
}]);